import * as dynamoose from "dynamoose";
import { DynamoDB } from '@aws-sdk/client-dynamodb';

const dynamodbClient = new DynamoDB({
    region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY},
});

dynamoose.aws.ddb.set(dynamodbClient);

export { dynamodbClient };