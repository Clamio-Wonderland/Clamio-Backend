import { DataMapper, QueryOptions } from '@aws/dynamodb-data-mapper';
import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { dataMapper } from 'src/config/data-mapper.config';
import { Order } from 'src/schema/order.schema';

declare global {
  namespace Express {
    interface Request {
      params: {
        productId?: string;
      };
    }
  }
}

@Injectable()
export class PurchaseCheckMiddler implements NestMiddleware {
  private readonly datamapper: DataMapper;

  constructor() {
    this.datamapper = dataMapper;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;
    const { userId } = req.body;

    if (!productId || userId)
      throw new NotFoundException('product Id and userid are required');

    try {
      let purchase = false;
      const query: QueryOptions = {
        filter: {
          type: 'And',
          conditions: [
            {
              type: 'Equals',
              subject: 'productId',
              object: productId,
            },
            {
              type: 'Equals',
              subject: 'status',
              object: 'SUCCESSFUL',
            },
          ],
        },
      };
      for await (const order of this.datamapper.query(
        Order,
        { productId },
        query,
      )) {
        purchase = true;
        break;
      }

      if (!purchase) {
        return res.status(403).json({
          message: 'You can only review products that you have purchased',
        });
      }

      next();
    } catch (error) {
      console.error('Error validation purchase: ' + error);
      return res.status(500).json({ message: 'Error validation purchase' });
    }
  }
}
