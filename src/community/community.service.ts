import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from 'src/schema/community-schema';
import { dataMapper } from '../config/data-mapper.config'; 
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
      _id: uuidv4(),
      creator_id:creator_id,
      name:name,
      description:description,
      thumbnail_url:thumbnail_url,
      slug:slug
    });

    try {
      const savedCommunity = await this.dataMapper.put(community);
      console.log(savedCommunity);
      return savedCommunity;
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error('Could not create community');
    }
    
  }



  
  async findAll() {
    const communities: Community[] = [];
    const iterator = this.dataMapper.scan({
      valueConstructor: Community,
      limit: 20
    });
  
    for await (const community of iterator) {
      communities.push(community);
    }
  
    return communities;
  }
  



  async findOne(id: string): Promise<Community | null> {
    try {
      const community = await this.dataMapper.get(Object.assign(new Community(), { _id : id }));
      return community;
    } catch (error) {
      if (error.name === 'ItemNotFoundException') {
        return null;
      }
      throw error;
    }
  }
  



  async update(id: string, updateCommunityDto: UpdateCommunityDto): Promise<Community | null> {
    const { name, creator_id, description, thumbnail_url } = updateCommunityDto;
  
    try {
      // retriving existing community
      const existingCommunity = await this.dataMapper.get(Object.assign(new Community(), { _id: id }));
      
      // Update only the fields that are provided in the update DTO
      const updatedCommunity = Object.assign(existingCommunity, {
        _id:id,
        name: name !== undefined ? name : existingCommunity.name,
        description: description !== undefined ? description : existingCommunity.description,
        thumbnail_url: thumbnail_url !== undefined ? thumbnail_url : existingCommunity.thumbnail_url
      });
  
      // Save the updated community
      const savedCommunity = await this.dataMapper.update(updatedCommunity);
      console.log('Community updated:', savedCommunity);
      return savedCommunity;
    } 
    catch (error) {
      if (error.name === 'ItemNotFoundException') {
        console.error('Community not found with ID:', id);
        return null;
      }
      console.error('Error updating community:', error);
      throw error;
    }
  }




  async remove(id: string) {
    try {
      const to_delete = Object.assign(new Community(),{_id : id});
      const result = await this.dataMapper.delete(to_delete);
    }
    catch (error) {
      throw error;
      
    }
    
  }
}
