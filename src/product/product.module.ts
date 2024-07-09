import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DataMapper, DynamoDBClient],
})
export class ProductModule {}
