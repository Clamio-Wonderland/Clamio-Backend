import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsUrl()
  thumbnail_url: string;

  @IsUrl()
  file_url: string;

  @IsString()
  content_type: string;

  @IsUUID()
  creator_id: string;

  @IsBoolean()
  is_active: boolean;
}
