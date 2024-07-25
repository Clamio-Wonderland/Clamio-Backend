import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from '../config/data-mapper.config';
import { user } from 'src/schema/user-schema';
import { DynamoDB } from 'aws-sdk';
import { dynamodbClient } from 'src/config/dynamoose.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly dataMapper: DataMapper;
  private readonly client: DynamoDB;

  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
    this.dataMapper = dataMapper;
  }

  private async checkTableExists(tableName: string): Promise<boolean> {
    try {
      await dynamodbClient.describeTable({ TableName: tableName });
      console.log(`Table "${tableName}" exists.`);
      return true;
    } catch (error) {
      if (error.code === 'ResourceNotFoundException') {
        console.log(`Table "${tableName}" does not exist.`);
        return false;
      } else {
        throw error;
      }
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos, id } = profile;
      const userData = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        profilePicture: photos[0].value,
        authMethod: {
          general: false,
          google: true,
          facebook: false,
          instagram: false,
        },
        createdAt: new Date(), // Add this if you want to set createdAt
      };

      const tableExists = await this.checkTableExists('user');
      if (tableExists) {
        const userEntity = Object.assign(new user(), userData);
        await this.dataMapper.put(userEntity);
        console.log('users saved');
      } else {
        console.log('Table does not exist, user not saved.');
      }

      console.log(userData);
      // console.log(profile);

      done(null, user);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  }
}
