import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';

@Module({
  providers: [CommunityService]
})
export class CommunityModule {}
