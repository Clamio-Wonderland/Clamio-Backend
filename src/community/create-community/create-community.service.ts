import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from 'src/dto/create-community.dto';


@Injectable()
export class CreateCommunityService {
  constructor() {}

  async createProduct(createCommunityDto: CreateCommunityDto) {
    
    return createCommunityDto;
  }
}
