import { table, attribute } from '@aws/dynamodb-data-mapper-annotations';

@table('Achievement')
export class Achievement {
  @attribute()
  id: number;

  @attribute()
  name: string;

  @attribute()
  threshold: number;
}
