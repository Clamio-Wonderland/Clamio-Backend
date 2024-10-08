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
  
    // @IsNumber()
    @IsNotEmpty()
    price: string; // price of the product as a decimal string
    
    @IsString()
    @IsNotEmpty()
    creator_id: string; // foreign key which connects the product to its creator
    
    @IsString()
    @IsNotEmpty()
    creator_name: string;

  }
  