import {
  attribute,
  hashKey,
  table,
  autoGeneratedHashKey,
} from '@aws/dynamodb-data-mapper-annotations';

@table('service')
export class Service {
  @autoGeneratedHashKey() // Auto-generated ID
  _id: string;

  @attribute() // ID of the creator of the service
  creator_id: string;

  @attribute() // Enum array representing service categories
  category: string[];

  @attribute() // Title of the service
  title: string;

  @attribute() // Description of the service
  description: string;

  @attribute() // Price of the service
  price: number;

  @attribute() // Average rating of the service
  avg_rating: number;

  @attribute() // ID of the review
  review_id: string;

  @attribute() // Array of product highlights
  product_highlights: string[];

  @attribute() // Timestamp of creation
  created_on: Date;

  @attribute() // Timestamp of last update
  updated_on: Date;

  @attribute() // Total number of purchases for the service
  total_purchase: number;

  @attribute() // Name of the creator
  creator_name: string;
}
