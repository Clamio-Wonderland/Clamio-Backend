import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductService } from 'src/product/product.service'; 
import { UploadService } from 'src/upload/upload.service';
import { MultiUploaderService } from 'src/multi-uploader/multi-uploader.service';
import { UuidModule } from 'nestjs-uuid';
@Module({
  imports: [
    UuidModule,
  ],
  controllers: [OrderController],
  providers: [OrderService,
    ProductService,
    UploadService,
    MultiUploaderService
  ],
})
export class OrderModule {}
