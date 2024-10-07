import { Status } from 'src/schema/order.schema';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  // @IsString()
  // @IsOptional()
  // user_id?: string;

  @IsString()
  razorpayId: string;

  @IsArray() // Validate that product_id is an array
  @ArrayNotEmpty() // Ensure that the array is not empty
  product_id: string[]; // Changed to an array of strings

  @IsNumber()
  quantity: number;

  @IsNumber()
  itemPrice: number;

  @IsString()
  @IsOptional()
  thumbnai_url?: string;

  @IsNumber()
  amountPaid: number;

  @IsString()
  status: Status;
}
