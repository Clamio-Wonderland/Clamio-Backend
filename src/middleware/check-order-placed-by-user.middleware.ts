import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { dataMapper } from 'src/config/data-mapper.config';
import { Order } from "src/schema/order.schema";
import { Item } from "src/schema/order.schema"; 

@Injectable()
export class CheckPlacedOrder implements NestMiddleware {
  private dataMapper: DataMapper;

  constructor() {
    this.dataMapper = dataMapper;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const product_id = req.body.product_id;
    const user_id = req.body.user_id;

    try {
      const iterator = this.dataMapper.scan(Order, {
        filter: {
          type: 'Equals',
          subject: 'user_id',
          object: user_id,
        },
      });

      const orders: Order[] = [];
      for await (const order of iterator) {
        orders.push(order);
      }

      if (orders.length === 0) {
        return res.status(404).send("Order is not placed");
      } else {
        const items: Item[] = orders[0].items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].product_id === product_id) {
            return next();  // Proceed to the next middleware if the product is found
          }
        }
        return res.status(404).send("Order is not placed");
      }
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }
}
