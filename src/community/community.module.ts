import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  controllers: [CommunityController],
  providers: [
    CommunityService,
    UploadModule
  ],
})
export class CommunityModule {}
