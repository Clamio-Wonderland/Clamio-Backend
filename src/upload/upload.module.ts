import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule
  ],
  providers: [UploadService]
})
export class UploadModule {}
