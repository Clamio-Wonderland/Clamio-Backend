// src/clamio-coin/clamio-coin.entity.ts

import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

export enum ProductCategory {
  TRAVEL_GUIDE = 'travel_guide',
  ESPORTS_GUIDE = 'esports_guide',
  FOOD_RECIPE = 'food_recipe',
  TAROT_READING = 'tarot_reading',
  DIET_PLAN = 'diet_plan',
  DIGITAL_ART = 'digital_art',
}

@table('product')
export class Product {
  @hashKey()
  _id: string;

  @attribute()
  title: string;

  @attribute()
  description: string;

  @attribute()
  createdon : Date;

  @attribute()
  updatedon : Date

  @attribute()
  category: ProductCategory;

  @attribute()
  price: number;

  @attribute()
  thumbnail_url: string [];

  @attribute()
  file_url: string;

  @attribute()
  content_type: string;

  @attribute()
  creator_id: string;

  @attribute()
  is_active: boolean;

  @attribute()
  total_purchase : number;

  @attribute()
  creator_name : string;
}
