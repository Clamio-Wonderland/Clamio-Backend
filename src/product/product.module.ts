import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { CreateProductService } from './create-product.service';

@Module({
  controllers: [CreateProductController],
  providers:[CreateProductService]
})
export class ProductModule {}
