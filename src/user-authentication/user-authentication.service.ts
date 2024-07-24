import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import {
  CreateUserDto,
  LoginUserDto,
} from './dto/create-user-authentication.dto';
import { dataMapper } from 'src/config/data-mapper.config';
import { user as User } from '../schema/user-schema';
import { dynamodbClient } from 'src/config/dynamoose.config';

@Injectable()
export class UserAuthenticationService {
  private readonly dataMapper: DataMapper;
  private readonly dynamoDBClient: DynamoDBClient;

  constructor(private readonly jwtService: JwtService) {
    this.dataMapper = dataMapper;
    this.dynamoDBClient = dynamodbClient;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.createdAt = new Date();

    await this.dataMapper.put(user);
    return { message: 'User created successfully' };
  }

  async login(loginUserDto: LoginUserDto, response: any) {
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
    // const token = this.jwtService.sign(payload);
    const token = 'adfasdfasdfasdfa';
    // Set cookie

    response.cookie('jwt', token);

    console.log('Login Successfull');

    return { message: 'Login successful', token };
  }

  async logout(response: any) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }

  async getUser(request: any) {
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const decoded = this.jwtService.verify(token);
    const user = await this.findOneById(decoded.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // private async findOneByEmail(email: string): Promise<User | null> {
  //   // Define scan parameters
  //   const params = {
  //     TableName: 'user',
  //     IndexName: 'email', // If using a secondary index
  //     KeyConditionExpression: 'email = :email',
  //     ExpressionAttributeValues: {
  //       ':email': { S: email },
  //     },
  //     Limit: 1,
  //   };

  //   try {
  //     // Execute scan operation
  //     const result = await this.dynamoDBClient.send(new QueryCommand(params));

  //     console.log(result);

  //     // Check if the scan returned any items
  //     if (
  //       (result.Items && result.Items.length) > 0 ||
  //       result.Items.length == 1
  //     ) {
  //       const item = result.Items[0];
  //       // Check if required fields are present and map them
  //       return {
  //         _id: item._id.S,
  //         email: item.email.S,
  //         username: item.username?.S,
  //         password: item.password?.S,
  //         firstname: item.firstname?.S,
  //         lastname: item.lastname?.S,
  //         profilePicture: item.profilePicture?.S,
  //         createdAt: new Date(item.createdAt.S),
  //       } as User;
  //     }

  //     return null;
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error finding user by email:', error);
  //     throw new Error('Error finding user by email');
  //   }
  // }

  async findOneByEmail(email: string) {
    // const { email } = createUserDto;
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
      return false;
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
