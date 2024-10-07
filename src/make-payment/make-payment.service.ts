import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateMakePaymentDto } from './dto/create-make-payment.dto';
import { Response } from 'express';
import { dataMapper } from 'src/config/data-mapper.config';
const Razorpay = require('razorpay');
import { user as User } from '../schema/user-schema';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { OrderService } from 'src/order/order.service';
@Injectable()
export class MakePaymentService {
  private readonly dataMapper: DataMapper;

  constructor(
    private readonly jwtService: JwtService,
    private readonly orderService: OrderService,
  ) {
    this.dataMapper = dataMapper;
  }

  async create(createMakePaymentDto: CreateMakePaymentDto, res: Response) {
    const { serviceName, email } = createMakePaymentDto;
    // jwt middlewar abhi nahi hain

    // try {
    //   const existingUser = await this.findOneByEmail(email);

    //   if (!existingUser) {
    //     throw new UnauthorizedException('User not exists with this email');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   throw new UnauthorizedException('User not exists');
    // }

    const razorpayOrderId =
      'NewOrder' + serviceName + Math.floor(Math.random() * 10000);

    //db call should be made
    const paymentAmount = 1000; // payment according to amount saved in the database

    let options = {
      amount: paymentAmount,
      currency: 'INR',
      receipt: razorpayOrderId,
    };

    const Instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID!,
      key_secret: process.env.RAZORYPAY_SECRET!,
    });

    const returnMessage = {
      status: false,
      data: {},
      message: '',
    };

    try {
      const razorpayOrder = await Instance.orders.create(options);

      const { amount, id, receipt, currency } = razorpayOrder;

      //db call to store the ammount,id,receipt,currency

      returnMessage.status = true;
      returnMessage.data = razorpayOrder;
      returnMessage.message = 'Order created successfully';
      return returnMessage;
    } catch (error) {
      returnMessage.status = false;
      returnMessage.data = error;
      returnMessage.message = 'Error creating order';

      return returnMessage;
    }
  }

  private async findOneByEmail(email: string): Promise<User | null> {
    const iterator = this.dataMapper.scan(User, {
      filter: {
        type: 'Equals',
        subject: 'email',
        object: email,
      },
    });

    const users: User[] = [];
    for await (const user of iterator) {
      users.push(user);
    }

    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }
}

// {
//   "status": true,
//   "data": {
//       "amount": 1000,
//       "amount_due": 1000,
//       "amount_paid": 0,
//       "attempts": 0,
//       "created_at": 1727687910,
//       "currency": "INR",
//       "entity": "order",
//       "id": "order_P3KFjxNC5odwif",
//       "notes": [],
//       "offer_id": null,
//       "receipt": "NewOrderTarowCard3823",
//       "status": "created"
//   },
//   "message": "Order created successfully"
// }
