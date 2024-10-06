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
import products from 'razorpay/dist/types/products';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // user places an order
  // check if product exists

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req,
  ) {
    let userCookie = req.cookies['user'];
    userCookie = JSON.parse(userCookie); 

    const Response = this.orderService.createOrder(createOrderDto, req, userCookie.id);
    return Response;
  }

  // get all the orders made by an user
  @Get('/getAllOrders')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Req() req): Promise<Order[]> {
    let userCookie = req.cookies['user'];
    userCookie = JSON.parse(userCookie); 
    return this.orderService.getUserOrders(userCookie.id);
  }

  // get order status
  @Get('/getOrderStatus/:productId')
  @UseGuards(JwtAuthGuard)
  async getOrderStatus(@Param('productId') product_id: string, @Req() req): Promise<string> {
    let userCookie = req.cookies['user'];
    userCookie = JSON.parse(userCookie); 
    const status = await this.orderService.getOrderStatus(product_id, userCookie.id);
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
