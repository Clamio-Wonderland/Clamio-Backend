import { Module } from '@nestjs/common';
import { MakePaymentService } from './make-payment.service';
import { MakePaymentController } from './make-payment.controller';
import { JwtService } from '@nestjs/jwt';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [MakePaymentController],
  providers: [MakePaymentService, JwtService, OrderService],
})
export class MakePaymentModule {}
