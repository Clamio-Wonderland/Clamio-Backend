import * as dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

const dynamodbClient = new DynamoDB({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAYDYCMARVWXT3UX5V',
    secretAccessKey: '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',
  },
});

dynamoose.aws.ddb.set(dynamodbClient);

export { dynamodbClient };
