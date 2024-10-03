import { Module } from '@nestjs/common';
import { MultiUploaderService } from './multi-uploader.service';
import { MultiUploaderController } from './multi-uploader.controller';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule
  ],
  providers: [MultiUploaderService],
  controllers: [MultiUploaderController]
})
export class MultiUploaderModule {}
