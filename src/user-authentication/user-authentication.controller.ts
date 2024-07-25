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
import { Response } from 'express';
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
    @Res() res: Response,
  ) {
    const { token, email, id } = await this.userAuthService.login(loginUserDto);

    res.cookie('user', JSON.stringify({ id, email, token }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({
      message: 'User logged in',
      user: { id, token, email },
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('user');
    return res.json({
      message: 'user successfully logged out',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() request: any) {
    return this.userAuthService.getUser(request);
  }
}
