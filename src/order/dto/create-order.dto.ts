import { Status } from 'src/schema/order.schema';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  // @IsNumber()
  quantity: number;
  
  @IsNotEmpty()
  @IsString()
  invoice_id:string;

}
