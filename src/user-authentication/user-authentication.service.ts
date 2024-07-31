import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataMapper } from '@aws/dynamodb-data-mapper';

import { Response } from 'express';
import {
  CreateUserDto,
  LoginUserDto,
} from './dto/create-user-authentication.dto';
import { dataMapper } from 'src/config/data-mapper.config';
import { user as User } from '../schema/user-schema';
import { dynamodbClient } from 'src/config/dynamoose.config';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Injectable()
export class UserAuthenticationService {
  private readonly dataMapper: DataMapper;

  constructor(private readonly jwtService: JwtService) {
    this.dataMapper = dataMapper;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    // Check if user already exists
    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = password ? await bcrypt.hash(password, 12) : null;

    // Create new user
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.createdAt = new Date();
    user.username = username;
    user.authMethod = {
      general: true,
      google: false,
      facebook: false,
      instagram: false,
    };

    await this.dataMapper.put(user);
    return { message: 'User created successfully' };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Check if user exists
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'mySecretJwtPassword',
    });

    return {
      token,
      id: user._id,
      email,
    };
  }

  async getUser(request: any) {
    const token = request.cookies['jwt'];
    const decoded = request.user;

    const user = await this.findOneById(decoded.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;

    return user;
  }

  private async findOneByEmail(email: string): Promise<User | null> {
    const iterator = this.dataMapper.scan(User, {
      filter: {
        type: 'Equals',
        subject: 'email',
        object: email,
      },
    });

    const users: User[] = [];
    for await (const user of iterator) {
      users.push(user);
    }

    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  private async findOneById(id: string): Promise<User | null> {
    const iterator = this.dataMapper.query(User, { _id: id }, { limit: 1 });

    for await (const user of iterator) {
      return user;
    }
    return null;
  }

  findAll() {
    return `This action returns all userAuthentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAuthentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAuthentication`;
  }
}
