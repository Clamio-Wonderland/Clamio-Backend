import { Module } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { UserAuthenticationController } from './user-authentication.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserAuthenticationController],
  providers: [UserAuthenticationService, JwtService],
})
export class UserAuthenticationModule {}
