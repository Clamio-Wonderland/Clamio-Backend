import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as AWS from 'aws-sdk';

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIAYDYCMARVQBD334O6",
    secretAccessKey: "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",
});

const dynamoDBClientV2 = new AWS.DynamoDB();

export const dataMapper = new DataMapper({
  client: dynamoDBClientV2,
});