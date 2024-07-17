import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UuidModule } from 'nestjs-uuid';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    UuidModule
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
