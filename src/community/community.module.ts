import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  providers: [CommunityService],
  imports: [DynamooseModule],
  controllers: [CommunityController],
})
export class CommunityModule {}
