import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Order, Status, Item } from 'src/schema/order.schema';
import { v4 as uuidv4 } from 'uuid';
import { dataMapper } from 'src/config/data-mapper.config';
import { user as User } from 'src/schema/user-schema';
@Injectable()
export class OrderService {
  private readonly dataMapper: DataMapper;

  constructor() {
    this.dataMapper = dataMapper;
  }
  async createOrder(orderData: CreateOrderDto, res: Request): Promise<any> {
    const {
      user_id,
      product_id,
      quantity,
      itemPrice: price,
      thumbnai_url,
      amountPaid: amount,
      status,
    } = orderData;
    // const user_id = await this.getUser(res);

    const item = new Item(
      product_id,
      quantity,
      price,
      new Date(),
      thumbnai_url,
    );

    try {
      const order = new Order();
      order.items = [];
      order._id = uuidv4();
      order.user_id = user_id;
      order.items.push(item);
      order.purchase_date = new Date();
      order.amount = amount;
      order.status = Status.SUCCESSFUL;

      await this.dataMapper.put(order);
      return {
        message: 'order successfully created',
        order,
      };
    } catch (error) {
      return {
        message: 'Error Creating order',
        error: error.message,
      };
    }
  }

  async getOrderStatus(orderId: string): Promise<Status> {
    const iterator = this.dataMapper.scan(Order, {
      filter: {
        type: 'Equals',
        subject: '_id',
        object: orderId,
      },
    });
    ``;

    const orders: Order[] = [];
    for await (const order of iterator) {
      orders.push(order);
    }

    if (orders.length > 0) {
      return orders[0].status;
    } else {
      throw new NotFoundException('Order not found with this id');
    }
  }

  async getUserOrders(req: Request): Promise<Order[]> {
    const userId = await this.getUser(req);
    const orders: Order[] = [];

    // Use the scan method to find orders by user_id
    const iterator = this.dataMapper.scan(Order, {
      filter: {
        type: 'Equals',
        subject: 'user_id',
        object: userId,
      },
    });

    for await (const order of iterator) {
      orders.push(order);
    }

    return orders;
  }

  private async findOneById(id: string): Promise<User | null> {
    const iterator = this.dataMapper.query(User, { _id: id }, { limit: 1 });

    for await (const user of iterator) {
      delete user.password;
      return user;
    }
    return null;
  }

  private async getUser(request: any) {
    const decoded = request.user;

    const user = await this.findOneById(decoded.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;

    return user._id;
  }
  async findAll(): Promise<Order[]> {
    const orders: Order[] = [];
    const iterator = await this.dataMapper.scan(Order);

    try {
      for await (const order of iterator) {
        orders.push(order);
      }
    } catch (error) {
      throw new Error('Error retrieving orders');
    }

    return orders;
  }

  async update(id: number, updatedOrder: Partial<Order>) {
    try {
      let order = await this.dataMapper.get(
        Object.assign(new Order(), { _id: id }),
      );

      if (!order) {
        return undefined;
      }
      order = Object.assign(order, updatedOrder);
      return this.dataMapper.put(order);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.dataMapper.delete(
        Object.assign(new Order(), { _id: id }),
      );
    } catch (error) {
      throw error;
    }
  }
}
