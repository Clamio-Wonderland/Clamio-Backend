import { Status } from 'src/schema/order.schema';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  itemPrice: number;

  @IsString()
  @IsOptional()
  thumbnai_url?: string;

  //thill here

  @IsNumber()
  amountPaid: number;

  @IsString()
  status: Status;
}
