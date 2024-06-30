import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateCommunityDto } from 'src/dto/create-community.dto';
import { CreateCommunityService } from 'src/community/create-community/create-community.service';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('create-community')
export class CreateCommunityController {
  constructor(private readonly createCommunityService: CreateCommunityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createCommunityDto: CreateCommunityDto) {
    return this.createCommunityService.createProduct(createCommunityDto);
  }
}
