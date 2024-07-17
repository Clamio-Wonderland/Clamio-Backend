import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadService } from 'src/upload/upload.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    UploadService
  ],
})
export class ProductModule {}
