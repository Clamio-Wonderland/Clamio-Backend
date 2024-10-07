import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Order, Status, Item } from 'src/schema/order.schema';
import { v4 as uuidv4 } from 'uuid';
import { dataMapper } from 'src/config/data-mapper.config';
import { user as User } from 'src/schema/user-schema';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/schema/product-schema';

@Injectable()
export class OrderService {
  private readonly dataMapper: DataMapper;
  private readonly productService: ProductService;

  constructor() {
    this.dataMapper = dataMapper;
  }

  async createOrder(orderData: CreateOrderDto, req: any): Promise<any> {
    const {
      product_id, // Changed from product_id to product_ids
      quantity,
      itemPrice: price,
      thumbnai_url,
      amountPaid: amount,
    } = orderData;

    const currTime = new Date();

    const items: Item[] = product_id.map(
      (id) => new Item(id, quantity, price, new Date(), thumbnai_url), // Make sure thumbnail_url is spelled correctly
    );

    //@ts-ignore
    const user_id: any = req?.user.sub;

    try {
      const products: any = await this.findMultiple(product_id); // New method to find multiple products
      if (products.error) {
        return {
          message: 'Some products not found',
          error: products.error,
        };
      }

      const order = new Order();
      order.items = items;
      order._id = uuidv4();
      order.user_id = user_id;
      order.purchase_date = new Date();
      order.amount = amount;
      order.status = Status.SUCCESSFUL;
      await this.dataMapper.put(order);
      return {
        message: 'Order successfully created',
        order,
      };
    } catch (error) {
      return {
        message: 'Error creating order',
        error: error.message,
      };
    }
  }

  private async findMultiple(ids: string[]) {
    const products = [];
    for (const id of ids) {
      try {
        const product: any = await this.findOne(id);
        if (product.error) {
          return {
            error: `Product not found for ID: ${id}`,
          };
        }
        products.push(product);
      } catch (error) {
        return {
          error: `Error retrieving product with ID: ${id}`,
        };
      }
    }
    return products;
  }

  private async findOne(id: string) {
    try {
      const product = await this.dataMapper.get(
        Object.assign(new Product(), { _id: id }),
      );
      return product;
    } catch (error) {
      return {
        message: 'Product not found',
        error: 'Incorrect product Id',
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
    //@ts-ignore
    const userId = req.user.sub;

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
