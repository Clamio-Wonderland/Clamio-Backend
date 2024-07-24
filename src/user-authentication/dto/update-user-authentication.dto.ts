import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user-authentication.dto';

export class UpdateUserAuthenticationDto extends PartialType(CreateUserDto) {}
