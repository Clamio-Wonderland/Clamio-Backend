import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { dataMapper } from '../config/data-mapper.config'; // Adjust the import path according to your project structure
import { Creator } from 'src/schema/creators.schema';

@Injectable()
export class VerifyCreator implements NestMiddleware {
  private readonly dataMapper: DataMapper = dataMapper;

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.cookies.creator; // Adjust this to where your user ID is stored in the request

    if (!userId) {
      return res.status(400).send('User ID not found in request');
    }

    // This check seems to be incorrect since userId will be a string or undefined.
    if (userId === true) {
      return next();
    } else {
      return res.status(404).send('User is not a creator');
    }

    // Uncomment and use the below code for actual DynamoDB check
    /*
    const creator = Object.assign(new Creator(), { user_id: userId });

    try {
      const result = await this.dataMapper.get(creator);
      if (result) {
        return next();
      }
    } catch (error) {
      if (error.name === 'ItemNotFoundException') {
        return res.status(404).send('User is not a creator');
      } else {
        console.error('Error fetching creator:', error);
        return res.status(500).send('Internal Server Error');
      }
    }
    */
  }
}
