import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('Review')
export class Review {
  @hashKey()
  productId: string;

  @rangeKey()
  _id: string;

  @attribute()
  userId: string;

  @attribute()
  rating: number;

  @attribute()
  comment: string;

  @attribute()
  createdOn: Date;

  @attribute()
  updatedOn?: Date;
}
