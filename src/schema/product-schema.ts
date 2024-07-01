// src/clamio-coin/clamio-coin.entity.ts

import { attribute, table } from '@aws/dynamodb-data-mapper-annotations';

enum ProductCategory {
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
