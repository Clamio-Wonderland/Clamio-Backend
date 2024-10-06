import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Order, Status, Item } from 'src/schema/order.schema';
import { v4 as uuidv4 } from 'uuid';
import { dataMapper } from 'src/config/data-mapper.config';
import { user as User } from 'src/schema/user-schema';
import { ProductService } from 'src/product/product.service';
import { use } from 'passport';
import { Cart } from 'src/schema/cart.schema';
import { error } from 'console';
import items from 'razorpay/dist/types/items';
@Injectable()
export class OrderService {
  private readonly dataMapper: DataMapper;

  constructor(
    private readonly productService: ProductService,
  ) {
    this.dataMapper = dataMapper;
  }

  async createOrder(orderData: CreateOrderDto, res: Request, user_id: string): Promise<any> {
    const { product_id, quantity, invoice_id } = orderData;

    try {
      // Fetch product details
      const productDetails = await this.productService.findOne(product_id);

      const item = new Item(
        product_id,
        quantity,
        invoice_id,
        productDetails.price,
        new Date(),
        productDetails.thumbnail_url,
        Status.PENDING,
        productDetails.creator_id,
        productDetails.creator_name,
        new Date()
      );

      // Check if an order already exists for the user
      const iterator = this.dataMapper.scan(Order, {
        filter: {
          type: 'Equals',
          subject: 'user_id',
          object: user_id
        }
      });

      let existingOrder = null;
      for await (const order of iterator) {
        existingOrder = order;
        break;
      }

      if (existingOrder) {

        existingOrder.items.push(item);
        return await this.dataMapper.put(existingOrder);
      }

      else {

        const newOrder = new Order();
        newOrder._id = uuidv4();
        newOrder.user_id = user_id;
        newOrder.items = [item];
        return await this.dataMapper.put(newOrder);
      }
    }
    catch (error) {
      // Proper error throwing
      throw error;
    }
  }


  async getOrderStatus(product_id: string, user_id: string): Promise<Status | string> {
    try {

      const iterator = this.dataMapper.scan(Order, {
        filter: {
          type: 'Equals',
          subject: 'user_id',
          object: user_id,
        },
      });

      let userOrder = null;


      for await (const order of iterator) {
        userOrder = order;
        break;
      }


      if (!userOrder) {
        return "No order found for this user.";
      }


      for (let i = 0; i < userOrder.items.length; i++) {
        if (userOrder.items[i].product_id === product_id) {
          return userOrder.items[i].status;
        }
      }


      return "Product not found in the user's order.";

    }
    catch (error) {
      if (error.name === 'ItemNotFoundException') {
        return "User has no valid orders.";
      }


      throw error;
    }
  }



  async getUserOrders(user_id: string): Promise<Order[]> {
    try {
      
      const iterator = this.dataMapper.scan(Order, {
        filter: {
          type: 'Equals',
          subject: 'user_id',
          object: user_id,
        },
      });
  
      let userOrder = null;
      for await (const order of iterator) {
        userOrder = order;
        break;
      }
  
      if (!userOrder) {
        return [];
      }
  
      return userOrder.items;
      
    } catch (error) {
      throw error;
    }
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
      let order = await this.dataMapper.get(Object.assign(new Order, { _id: id }));

      if (!order) {
        return undefined;
      }
      order = Object.assign(order, updatedOrder);
      return this.dataMapper.put(order);
    }
    catch (error) {
      throw error;
    }

  }

  async remove(id: number) {
    try {
      return await this.dataMapper.delete(Object.assign(new Order, { _id: id }));
    }
    catch (error) {
      throw error;
    }
  }
}
