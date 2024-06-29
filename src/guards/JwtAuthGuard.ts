import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    //@ts-ignore
    const token = request.cookies['jwt']; // Assuming token is stored in a cookie named 'jwt'

    if (token) {
      return true; // Allow the request to proceed
    } else {
      throw new UnauthorizedException('Unauthorized access'); // Throw an error if token is missing
    }
  }

  handleRequest(err, user, info) {
    // Handle the result of Passport's authentication here
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
