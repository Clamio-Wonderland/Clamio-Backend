import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UploadService } from 'src/upload/upload.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [
    UuidModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UploadService
  ],
})
export class UserModule {}
