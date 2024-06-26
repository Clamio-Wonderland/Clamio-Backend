import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  accessToken?: string;
  isAdmin: true;
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming `request.user` contains the authenticated user object
    return user && user.isAdmin; // Implement logic to check if user is admin
  }
}
