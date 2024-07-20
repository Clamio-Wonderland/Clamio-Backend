import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from 'src/schema/creators.schema';
import { dataMapper } from '../config/data-mapper.config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { hostname } from 'os';
const http = require('http')



@Injectable()
export class CreatorService {
  constructor() {

  }
  private readonly dataMapper: DataMapper = dataMapper;
  async create(createCreatorDto: CreateCreatorDto) {
    const { user_id, title, description, website, avatar, social_link, expertise, average_rating, follower, total_sales, earnings, bank_account } = createCreatorDto;

    const creator = Object.assign(new Creator(), {
      _id: user_id,
      user_id: user_id,
      title: title,
      description: description,
      website: website,
      avatar: avatar,
      social_link: social_link,
      expertise: expertise,
      average_rating: average_rating,
      follower: follower,
      total_sales: total_sales,
      earnings: earnings,
      bank_account: bank_account

    })

    try {
      const result = await this.dataMapper.put(creator);
      return result;
    } catch (error) {
      console.log(error);
      throw error;

    }

  }

  async findAll(): Promise<Creator[]> {
    try {
      const creators: Creator[] = [];
      const iterator = this.dataMapper.scan(Creator);

      for await (const creator of iterator) {
        creators.push(creator);
      }

      return creators;
    } catch (error) {
      throw error;
    }
  }



  async findOne(id: string) {
    try {
      const creator = await this.dataMapper.get(Object.assign(new Creator(), { _id: id }));
      return creator;
    }
    catch (error) {
      throw error;

    }
  }



  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    let existedCreator = await this.dataMapper.get(Object.assign(new Creator, { _id: id }));

    const { title, description, website, avatar, social_link, expertise, average_rating, follower, total_sales, earnings, bank_account } = updateCreatorDto;

    const creator = Object.assign(new Creator(), {
      _id : existedCreator._id,
      title: title !== undefined ? title : existedCreator.title,
      description: description !== undefined ? description : existedCreator.description,
      website: website !== undefined ? website : existedCreator.website,
      avatar: avatar !== undefined ? avatar : existedCreator.avatar,
      social_link: social_link !== undefined ? social_link : existedCreator.social_link,
      expertise: expertise !== undefined ? expertise : existedCreator.expertise,
      average_rating: average_rating !== undefined ? average_rating : existedCreator.average_rating,
      follower: follower !== undefined ? follower : existedCreator.follower,
      total_sales: total_sales !== undefined ? total_sales : existedCreator.total_sales,
      earnings: earnings !== undefined ? earnings : existedCreator.earnings,
      bank_account: bank_account !== undefined ? bank_account : existedCreator.bank_account,

    });

    try {
      const result = await this.dataMapper.update(creator);
      return result;
    }
    catch (error) {
      console.log(error);
      throw error;

    }


  }



  remove(id: string) {
    try {
      const result = this.dataMapper.delete(Object.assign(new Creator(), { _id: id }));
      return result;
    } catch (error) {
      throw error;

    }
  }
}
