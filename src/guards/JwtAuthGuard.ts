import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const cookie = request.cookies['user'];

    if (!cookie) {
      throw new UnauthorizedException('No cookie found');
    }

    try {
      const decodedCookie = decodeURIComponent(cookie);
      const userObject = JSON.parse(decodedCookie);
      const secret = process.env.JWT_SECRET || 'mySecretJwtPassword';
      const decoded = jwt.verify(userObject.token, secret); // Verify token from cookie
     
      console.log("this is my cookie>>>>>>", decoded)
      request.user = decoded; // Attach decoded token to the request
      return true;
    } catch (err) {
      console.log("error in jwt guard>>>>>>>>>", err)
      throw new UnauthorizedException('Unauthorized. Please Login to continue');
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized. Please Login to continue');
    }
    return user;
  }
}
