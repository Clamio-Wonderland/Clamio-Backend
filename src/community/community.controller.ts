import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCommunityDto } from 'src/dto/createCommunityDto';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCommunity(createCommunityDto: CreateCommunityDto) {
    return this.communityService.createCommunity(createCommunityDto);
  }
}
