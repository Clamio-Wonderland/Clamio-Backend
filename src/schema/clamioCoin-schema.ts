import { attribute, table } from '@aws/dynamodb-data-mapper-annotations';

@table('ClamioCoin')
export class ClamioCoin {
  @attribute()
  id: number;

  @attribute()
  user_id: number;

  @attribute()
  amount: number;

  @attribute()
  reason: string;
}
