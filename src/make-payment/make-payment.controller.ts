import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MakePaymentService } from './make-payment.service';
import { CreateMakePaymentDto } from './dto/create-make-payment.dto';
import { UpdateMakePaymentDto } from './dto/update-make-payment.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { OrderService } from 'src/order/order.service';

@Controller('payment')
export class MakePaymentController {
  constructor(
    private readonly makePaymentService: MakePaymentService,
    private readonly orderService: OrderService,
  ) {}

  @Post('make')
  create(@Body() createMakePaymentDto: CreateMakePaymentDto, @Req() req) {
    return this.makePaymentService.create(createMakePaymentDto, req);
  }

  @Post('confirm-payment')
  async confirmPayment(
    @Body() confirm: CreateOrderDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const orderResult = await this.orderService.createOrder(confirm, req);
      return res.json(orderResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Error confirming payment',
        error: error.message,
      });
    }
  }

  // @Get()
  // findAll() {
  //   return this.makePaymentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.makePaymentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMakePaymentDto: UpdateMakePaymentDto) {
  //   return this.makePaymentService.update(+id, updateMakePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.makePaymentService.remove(+id);
  // }
}
