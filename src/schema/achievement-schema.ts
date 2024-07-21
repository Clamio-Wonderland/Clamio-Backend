import { table, attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';

@table('Achievement')
export class Achievement {
  @hashKey()
  _id: string;

  @attribute()
  name: string;

  @attribute()
  threshold: number;
}
