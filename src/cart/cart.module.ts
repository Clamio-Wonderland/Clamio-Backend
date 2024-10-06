import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductService } from 'src/product/product.service';
import { UploadService } from 'src/upload/upload.service';
import { MultiUploaderService } from 'src/multi-uploader/multi-uploader.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule
  ],
  controllers: [CartController],
  providers: [CartService ,
    ProductService,
    UploadService,
    MultiUploaderService
  ]
})
export class CartModule {}
