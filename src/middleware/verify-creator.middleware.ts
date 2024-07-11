import { Injectable, NestMiddleware, Inject, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBService } from 'src/aws/dynamodb.service';
import { Creator } from 'src/schema/creators.schema';

@Injectable()
export class VerifyCreator implements NestMiddleware {
  private mapper: DataMapper;

  constructor(private readonly dynamoDBService: DynamoDBService) {
    const client = this.dynamoDBService.getClient();
    this.mapper = new DataMapper({ client });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.cookies.creator; // Adjust this to where your user ID is stored in the request

    if (!userId) {
      return res.status(400).send('User ID not found in request');
    }

    if(userId === true){
        return next();
    }
    else{
        return res.status(404).send ("user is not creator");
    }

    // const creator = Object.assign(new Creator(), { user_id: userId });

    // try {
    //   const result = await this.mapper.get(creator);
    //   if (result) {
    //     return next();
    //   }
    // } catch (error) {
    //   if (error.name === 'ItemNotFoundException') {
    //     return res.status(404).send('User is not a creator');
    //   } else {
    //     console.error('Error fetching creator:', error);
    //     return res.status(500).send('Internal Server Error');
    //   }
    // }
  }
}
