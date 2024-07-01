import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDB;

  constructor() {
    this.client = new DynamoDB({
      region: 'your-region', // Replace with your AWS region
      // Optionally, you can add credentials configuration here if not using default credentials.
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
    });
  }

  getClient(): DynamoDB {
    return this.client;
  }
}
