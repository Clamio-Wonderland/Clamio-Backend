import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config()

AWS.config.update({
    region:process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDBClientV2 = new AWS.DynamoDB();

export const dataMapper = new DataMapper({
  client: dynamoDBClientV2,
});
