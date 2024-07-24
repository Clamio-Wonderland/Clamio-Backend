import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import {
  CreateUserDto,
  LoginUserDto,
} from './dto/create-user-authentication.dto';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';

@Controller('user-auth')
export class UserAuthenticationController {
  constructor(private readonly userAuthService: UserAuthenticationService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userAuthService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Res() response: any,
  ) {
    return this.userAuthService.login(loginUserDto, response);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() response: any) {
    return this.userAuthService.logout(response);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() request: any) {
    return this.userAuthService.getUser(request);
  }
}
