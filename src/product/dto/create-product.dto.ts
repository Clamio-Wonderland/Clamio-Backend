import { File } from 'buffer';
import {IsBoolean, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
import { ProductCategory } from 'src/schema/product-schema';
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string; // product name that is showed to user
  
    @IsString()
    @IsNotEmpty()
    description: string; // additional information about the product
  
    @IsString()
    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: string; // 'travel_guide', 'esports_guide', 'food_recipe', 'tarot_reading', 'diet_plan', 'digital_art'
  
    @IsDecimal()
    @IsNotEmpty()
    price: string; // price of the product as a decimal string
    
    
  
    @IsString()
    content_type?: string; // optional field to specify product type, such as .mp3, .pdf, etc.
  
    @IsString()
    @IsNotEmpty()
    creator_id: string; // foreign key which connects the product to its creator
  
    // @IsBoolean()
    @IsNotEmpty()
    active: boolean;
  }
  