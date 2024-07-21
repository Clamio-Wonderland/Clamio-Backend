import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('ClamioCoin')
export class ClamioCoin {
  @hashKey()
  _id: string;

  @attribute()
  user_id: number;

  @attribute()
  amount: number;

  @attribute()
  reason: string;
}
