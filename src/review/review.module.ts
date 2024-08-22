import {
  Get,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PurchaseCheckMiddler } from 'src/middleware/purchase-check-middleware';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PurchaseCheckMiddler).forRoutes({
      path: 'product/user/:productId',
      method: RequestMethod.GET,
    });
  }
}
