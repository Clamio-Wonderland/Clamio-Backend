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
      const userObject = JSON.parse(cookie);
      const secret = process.env.JWT_SECRET || 'mySecretJwtPassword';
      const decoded = jwt.verify(userObject.token, secret); // Verify token from cookie
      request.user = decoded; // Attach decoded token to the request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
