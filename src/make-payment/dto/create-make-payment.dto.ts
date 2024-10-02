import { isInt, IsString } from 'class-validator';

export class CreateMakePaymentDto {
  @IsString()
  serviceName: string;

  @IsString()
  email: string;
}
