import {IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
  
  export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; // primary key to uniquely identify the product
  
    @IsString()
    @IsNotEmpty()
    title: string; // product name that is showed to user
  
    @IsString()
    @IsNotEmpty()
    description: string; // additional information about the product
  
    @IsString()
    @IsNotEmpty()
    category: string; // 'travel_guide', 'esports_guide', 'food_recipe', 'tarot_reading', 'diet_plan', 'digital_art'
  
    @IsDecimal()
    @IsNotEmpty()
    price: string; // price of the product as a decimal string
  
    @IsUrl()
    @IsNotEmpty()
    thumbnail_url: string;
  
    @IsUrl()
    @IsNotEmpty()
    file_url: string; // URL to download the file ('pdf', 'mp3', etc.)
  
    @IsString()
    content_type?: string; // optional field to specify product type, such as .mp3, .pdf, etc.
  
    @IsString()
    @IsNotEmpty()
    creator_id: string; // foreign key which connects the product to its creator
  
    @IsBoolean()
    @IsNotEmpty()
    active: boolean;
  }
  