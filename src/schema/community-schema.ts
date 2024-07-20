import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('community')
export class Community {
  @hashKey()
  _id: string;

  @attribute()
  creator_id: string;

  @attribute()
  name: string;

  @attribute()
  description: string;

  @attribute()
  thumbnail_url: string;
}
