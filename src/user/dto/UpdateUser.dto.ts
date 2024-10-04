import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  creator: boolean;

}
