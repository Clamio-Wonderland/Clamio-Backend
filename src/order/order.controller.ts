import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { Order } from '../schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // user places an order
  // check if product exists

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() res: Request,
  ): Promise<any> {
    const Response = this.orderService.createOrder(createOrderDto, res);
    return Response;
  }

  // get all the orders made by an user
  @Get('/getAllOrders')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Req() res: Request): Promise<Order[]> {
    return this.orderService.getUserOrders(res);
  }

  // get order status
  @Get('/getOrderStatus/:orderId')
  async getOrderStatus(@Param('orderId') orderId: string): Promise<string> {
    const status = await this.orderService.getOrderStatus(orderId);
    return status;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
