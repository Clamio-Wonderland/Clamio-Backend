import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  loginWithGoogle() {
    return "<a href='auth/google'>Login with google</a>";
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { email, profileId } = req.user;

    // Generate JWT token
    const token = this.authService.generateJwt({ email, id: profileId });

    // Send token as a cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000 * 5, //  Example: 5 hours expiration time
    });

    // Redirect or send a response as needed
    return res.redirect('/'); // Example: Redirect to home page

    // return {
    //   user: req.user,
    // };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    // Clear the cookie on logout
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    // Optionally, redirect or send a response as needed
    return res.send({ message: 'Logged out successfully' });
  }

  @Get('me')
  // @UseGuards(AuthGuard('google'))
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req) {
    // if (req.user) {
    //   return {
    //     message: 'user logged in',
    //     user: req.user,
    //   };
    // } else {
    //   return { message: 'User not found' };
    // }
    return 'user verified';
  }
}
