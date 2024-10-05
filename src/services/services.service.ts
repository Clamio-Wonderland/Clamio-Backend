import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';

import { CreatorService } from 'src/creator/creator.service';

@Injectable()
export class ServicesService {
  constructor(
    
  ){}
  private readonly dataMapper: DataMapper = dataMapper;
  async create(createServiceDto: CreateServiceDto) {
    const {creator_id,category,title,description,price,avg_rating,review_id,product_highlights,total_purchase,creator_name} = createServiceDto;
    
    const service = Object.assign(new Service,{
      creator_id,
      category,
      title,
      description,
      price,
      avg_rating,
      review_id,
      product_highlights,
      created_on:new Date(),
      updted_on:new Date(),
      total_purchase,
      creator_name

    });
    
    try{
      // const isCreatorValid = await this.creatorService.findOne(creator_id);
      
        const result = this.dataMapper.put(service);
        return result;
      
      
    }
    catch(error){
      throw error
    }
  
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: string) {
    return `This action returns a #${id} service`;
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: string) {
    return `This action removes a #${id} service`;
  }
}
