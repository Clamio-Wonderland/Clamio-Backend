// src/clamio-coin/clamio-coin.entity.ts

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

@table('Achievement')
export class Achievement {
  @attribute()
  id: number;

  @attribute()
  name: string;

  @attribute()
  threshold: number;
}

export enum ProductCategory {
  TRAVEL_GUIDE = 'travel_guide',
  ESPORTS_GUIDE = 'esports_guide',
  FOOD_RECIPE = 'food_recipe',
  TAROT_READING = 'tarot_reading',
  DIET_PLAN = 'diet_plan',
  DIGITAL_ART = 'digital_art',
}

@table('Product')
export class Product {
  @attribute()
  id: number;

  @attribute()
  title: string;

  @attribute()
  description: string;

  @attribute()
  category: ProductCategory;

  @attribute()
  price: number;

  @attribute()
  thumbnail_url: string;

  @attribute()
  file_url: string;

  @attribute()
  content_type: string;

  @attribute()
  creator_id: number;

  @attribute()
  is_active: boolean;
}

// creator schema;
@table('Creator')
export class Creator {
  @attribute()
  id: number;

  @attribute()
  user_id: number;

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