import { Module } from '@nestjs/common';
import { DownloadableService } from './downloadable.service';
import { DownloadableController } from './downloadable.controller';
import { ProductService } from 'src/product/product.service'; 
import { UploadService } from 'src/upload/upload.service';
import { MultiUploaderService } from 'src/multi-uploader/multi-uploader.service';
import { OrderService } from 'src/order/order.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule,
  ],
  controllers: [DownloadableController],
  providers: [DownloadableService,
    OrderService,
    ProductService,
    UploadService,
    MultiUploaderService
  ],
})
export class DownloadableModule {}
