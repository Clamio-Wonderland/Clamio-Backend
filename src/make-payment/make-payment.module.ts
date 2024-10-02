import { Module } from '@nestjs/common';
import { MakePaymentService } from './make-payment.service';
import { MakePaymentController } from './make-payment.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MakePaymentController],
  providers: [MakePaymentService, JwtService],
})
export class MakePaymentModule {}
