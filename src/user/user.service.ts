import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { user } from 'src/schema/user-schema';
// import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UserService {
  private readonly dataMapper: DataMapper;

  constructor() {
    this.dataMapper = dataMapper;
  }

  // async getUserById(id: string): Promise<user | null> {
  //   try {
  //     // Correct usage of the user class as a type
  //     return await this.dataMapper.get(user, { _id: id });
  //   } catch (error) {
  //     console.error('Error retrieving user by ID:', error);
  //     return null;
  //   }
  // }

  async getAllUsers(): Promise<user[]> {
    try {
      const users: user[] = [];
      for await (const u of this.dataMapper.scan(user)) {
        users.push(u);
      }
      console.log(users);
      // return users;
    } catch (error) {
      console.error('Error retrieving all users:', error);
      return [];
    }
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: string): Promise<user | undefined> {
    try {
      const product = await this.dataMapper.get(Object.assign(new user(), {_id: id}));
    } catch (error) {
      if (error.name === 'ItemNotFoundException'){
        return undefined;
      }
      console.error('Error getting product by ID: ', error);
      throw error;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
