import { Status } from 'src/schema/order.schema';
import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  user_id: string;

  // this attribute should goe into item aaray
  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  thumbnai_url: string;

  //thill here 

  
  @IsNumber()
  amount: number;

  @IsNumber()
  status: Status;
}
