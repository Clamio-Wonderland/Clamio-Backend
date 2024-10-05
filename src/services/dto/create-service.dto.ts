import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    // ID of the creator of the service
    @IsNotEmpty()
    @IsString()
    creator_id: string;

    // Enum array representing service categories
    @IsNotEmpty()
    
    category: string[];

    // Title of the service
    @IsNotEmpty()
    @IsString()
    title: string;

    // Description of the service
    @IsNotEmpty()
    @IsString()
    description: string;

    // Price of the service
    @IsNotEmpty()
    @IsNumber()
    price: number;

    // Average rating of the service
    @IsNotEmpty()
    @IsNumber()
    avg_rating: number;

    // ID of the review
    @IsNotEmpty()
    @IsString()
    review_id: string;

    // Array of product highlights
    @IsNotEmpty()
    // @IsString()
    product_highlights: string[];


    // Total number of purchases for the service
    @IsNotEmpty()
    @IsNumber()
    total_purchase: number;

    // Name of the creator
    @IsNotEmpty()
    @IsString()
    creator_name: string;
}
