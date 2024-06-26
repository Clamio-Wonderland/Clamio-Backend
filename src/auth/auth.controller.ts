import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  @Get()
  loginWithGoogle() {
    return "<a href='auth/google'>Login with google</a>";
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    if (user) {
      return res.send(user);
    } else {
      return res.status(401).send('Authentication failed');
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('google'))
  getUserInfo(@Req() req) {
    if (req.user) {
      return {
        message: 'user logged in',
        user: req.user,
      };
    } else {
      return { message: 'User not found' };
    }
  }
}
