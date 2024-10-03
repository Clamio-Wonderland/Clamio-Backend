import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  creator: boolean;

}
