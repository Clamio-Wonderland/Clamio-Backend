import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { CommunityService } from 'src/community/community.service';

@Module({
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
