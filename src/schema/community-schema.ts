import { attribute, table } from '@aws/dynamodb-data-mapper-annotations';

@table('Community')
export class Community {
  @attribute()
  id: number;

  @attribute()
  creator_id: number;

  @attribute()
  name: string;

  @attribute()
  description: string;

  @attribute()
  thumbnail_url: string;
}
