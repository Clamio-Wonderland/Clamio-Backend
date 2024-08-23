import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { UploadService } from 'src/upload/upload.service';
import { UuidModule } from 'nestjs-uuid';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    UuidModule
  ],
  controllers: [CommunityController],
  providers: [
    CommunityService,
    UploadService,
    UploadModule
  ],
})
export class CommunityModule {}
