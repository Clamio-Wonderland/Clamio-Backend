import { PartialType } from '@nestjs/mapped-types';
import { CreateMakePaymentDto } from './create-make-payment.dto';

export class UpdateMakePaymentDto extends PartialType(CreateMakePaymentDto) {}
