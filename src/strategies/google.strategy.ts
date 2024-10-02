import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from '../config/data-mapper.config';
import { DynamoDB } from 'aws-sdk';
import { dynamodbClient } from 'src/config/dynamoose.config';
import { user as User } from '../schema/user-schema';

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

  private async findOneByEmail(email: string): Promise<User | null> {
    const iterator = this.dataMapper.scan(User, {
      filter: {
        type: 'Equals',
        subject: 'email',
        object: email,
      },
    });

    const users: User[] = [];
    for await (const user of iterator) {
      users.push(user);
    }

    if (users.length > 0) {
      return users[0];
    } else {
      return null;
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

      const user = userData;
      console.log(user);
      // const user = await this.findOneByEmail(userData.email);
      // if (!user) {
      //   const userEntity = Object.assign(new User(), userData);
      // }

      done(null, user);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  }
}
