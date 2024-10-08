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

    res.cookie('user', JSON.stringify({ email, token, id: profileId }), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000 * 24, // Example: 5 hours expiration time
    });

    // Redirect or send a response as needed
    return res.redirect('/'); // Example: Redirect to home page
  }

  @Get('logout')
  logout(@Res() res: Response) {
    // Clear the cookie on logout
    res.clearCookie('user', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    // Optionally, redirect or send a response as needed
    return res.send({ message: 'Logged out successfully' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req) {
    const userCookie = req.cookies['user'];
    const user = userCookie ? JSON.parse(userCookie) : null;

    return {
      user: req.user || user, // Use req.user if JwtAuthGuard is used, otherwise use session
    };
  }
}
