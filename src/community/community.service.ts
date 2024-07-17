import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from 'src/schema/community-schema';
import { dataMapper } from '../config/data-mapper.config'; // Adjust the import path according to your project structure
import { DataMapper } from '@aws/dynamodb-data-mapper';
// import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class CommunityService {

  constructor(
    // private uploadService: UploadService
  ){}
  
  private readonly dataMapper: DataMapper = dataMapper;

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const { name, creator_id, description, thumbnail_url } = createCommunityDto;
    const slug = `${name}-${uuidv4()}`;

    const community = Object.assign(new Community(), {
      id: Date.now().toString(), // Example way to generate ID, consider using a better unique ID strategy
      creator_id,
      name,
      description,
      thumbnail_url,
      slug,
    });

    try {
      const savedCommunity = await this.dataMapper.put(community);
      return savedCommunity;
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error('Could not create community');
    }
    
  }

  // findAll() {
  //   return `This action returns all community`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} community`;
  // }

  // update(id: number, updateCommunityDto: UpdateCommunityDto) {
  //   return `This action updates a #${id} community`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} community`;
  // }
}
