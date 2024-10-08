// src/clamio-coin/clamio-coin.entity.ts

import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

// creator schema;
@table('creator')
export class Creator {
  @hashKey()
  _id: string;

  @attribute()
  user_id: string;

  @attribute()
  title: string;

  @attribute()
  description: string;

  @attribute()
  website: string;

  @attribute()
  avatar: string;

  @attribute()
  social_link: Record<string, any>;

  @attribute()
  expertise: string;

  @attribute()
  average_rating: number;

  @attribute()
  follower: number;

  @attribute()
  total_sales: number;

  @attribute()
  earnings: number;

  @attribute()
  bank_account: number;
}
