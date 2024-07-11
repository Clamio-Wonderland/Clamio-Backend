import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, PassportModule.register({ session: true })],
  providers: [AuthService, GoogleStrategy, SessionSerializer, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
