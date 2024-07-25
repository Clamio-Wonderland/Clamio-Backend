import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}

  generateAndSendToken(email: any, profileId) {
    const jwtToken = this.generateJwt({ email, id: profileId });
    return jwtToken;
  }

  generateJwt(user) {
    const payload = { id: user.googleId, email: user.email };
    const jwtSecret = process.env.JWT_SECRET || 'mySecretJWTPassword';
    return this.JwtService.sign(payload, { secret: jwtSecret });
  }

  clearCookie(res: Response): void {
    //@ts-ignore
    res.clearCookie(this.cookieName, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }
}
