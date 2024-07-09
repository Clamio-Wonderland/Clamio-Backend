// src/community/community.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { CreateCommunityDto } from 'src/dto/createCommunityDto';
import { Community } from 'src/schema/community-schema';
import { dataMapper } from '../config/data-mapper.config'; // Adjust the import path according to your project structure

@Injectable()
export class CommunityService {
  private readonly dataMapper: DataMapper = dataMapper;

  async createCommunity(
    createCommunityDto: CreateCommunityDto,
  ): Promise<Community> {
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
}
