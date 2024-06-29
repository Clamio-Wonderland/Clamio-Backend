// src/aws/dynamodb.service.ts

import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDB;

  constructor() {
    this.client = new DynamoDB({
      region: 'your-region', // Replace with your AWS region
      // Optionally, you can add credentials configuration here if not using default credentials.
    });
  }

  getClient(): DynamoDB {
    return this.client;
  }
}
