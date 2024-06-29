import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard('google'))
  getProfile(@Req() req) {
    return 'user logged in ';
  }
}
