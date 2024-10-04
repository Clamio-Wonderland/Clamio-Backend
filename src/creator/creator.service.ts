import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from 'src/schema/creators.schema';
import { dataMapper } from '../config/data-mapper.config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { v4 as uuidv4 } from 'uuid';
import { UploadService } from 'src/upload/upload.service';
import { UserService } from 'src/user/user.service';




@Injectable()
export class CreatorService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly userService: UserService
  ) { }
  private readonly dataMapper: DataMapper = dataMapper;



  async create(createCreatorDto: CreateCreatorDto, file, user_id) {

    const { title, description, website, social_link, expertise, bank_account } = createCreatorDto;

    const iterator = this.dataMapper.scan(Creator, {
      filter: {
        type: 'Equals',
        subject: 'user_id',
        object: user_id,
      },
    });

    var creator = null;
    for await (const record of iterator) {
      creator = record
    }
  


    if (creator) {
      return "creator for this user is allready exist";
    }
    else {
      const avatar_url = await this.uploadService.uploadProduct(file);


      const creator = Object.assign(new Creator(), {
        _id: uuidv4(),
        user_id: user_id,
        title: title,
        description: description,
        website: website,
        avatar: avatar_url,
        social_link: social_link,
        expertise: expertise,
        average_rating: 0,
        follower: 0,
        total_sales: 0,
        earnings: 0,
        bank_account: bank_account

      });

      try {
        const result = await this.userService.update(user_id, { creator: true });
      }
      catch (error) {
        throw error;
      }

      try {

        const result = await this.dataMapper.put(creator);
        return result;
      } catch (error) {
        console.log(error);
        throw error;

      }
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
    }
    catch (error) {
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

    const { title, description, website, avatar, social_link, expertise, bank_account } = updateCreatorDto;

    const creator = Object.assign(new Creator(), {
      _id: existedCreator._id,
      title: title !== undefined ? title : existedCreator.title,
      description: description !== undefined ? description : existedCreator.description,
      website: website !== undefined ? website : existedCreator.website,
      avatar: avatar !== undefined ? avatar : existedCreator.avatar,
      social_link: social_link !== undefined ? social_link : existedCreator.social_link,
      expertise: expertise !== undefined ? expertise : existedCreator.expertise,
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
