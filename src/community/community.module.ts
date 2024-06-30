import { Module } from '@nestjs/common';
import { CreateCommunityController } from './create-community/create-community.controller';
import { CreateCommunityService } from './create-community/create-community.service';

@Module({
  controllers: [CreateCommunityController],
  providers:[CreateCommunityService]
})
export class CommunityModule {

}
