import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadService } from 'src/upload/upload.service';
import { UuidModule } from 'nestjs-uuid';
import { MultiUploaderService } from 'src/multi-uploader/multi-uploader.service';
import { CreatorService } from 'src/creator/creator.service';

@Module({
  imports: [
    UuidModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    UploadService,
    MultiUploaderService
  ],
})
export class ProductModule {}
