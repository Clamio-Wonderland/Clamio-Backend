import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  product_id: string;

  @IsNumber()
  amount: number;
}
