import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [CommunityController],
  providers: [
    CommunityService,
    UploadService
  ],
})
export class CommunityModule {}
