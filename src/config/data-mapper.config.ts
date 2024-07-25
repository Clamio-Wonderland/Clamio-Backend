import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config()

AWS.config.update({
    region:'us-east-1',
    accessKeyId:'AKIAYDYCMARVWXT3UX5V',
    secretAccessKey: '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',
});

const dynamoDBClientV2 = new AWS.DynamoDB();

export const dataMapper = new DataMapper({
  client: dynamoDBClientV2,
});
