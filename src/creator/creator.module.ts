import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { CommunityService } from 'src/community/community.service';
import { UploadService } from 'src/upload/upload.service';
import { UuidModule } from 'nestjs-uuid';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UuidModule,
  ],
  controllers: [CreatorController],
  providers: [
    CreatorService,
    UploadService,
    UserService

  ],
})
export class CreatorModule {}
