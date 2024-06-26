import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}
  generateJwt(payload) {
    return this.JwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: any) {
    try {
      //register user into the databse
      const newUser = 'db logic';
      //   return this.generateJwt({
      //     sub: newUser.id,
      //     email: newUser.email,
      //   });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email) {
    // const user = await this.user.findOne({ email });

    const user = '';
    if (!user) {
      return null;
    }

    return user;
  }
}
