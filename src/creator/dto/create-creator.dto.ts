import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCreatorDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    website: string;

    @IsNotEmpty()
    @IsString()
    avatar: string;

    @IsNotEmpty()
    social_link: Record<string, any>;

    @IsNotEmpty()
    @IsString()
    expertise: string;

    @IsNotEmpty()
    @IsNumber()
    average_rating: number;

    @IsNotEmpty()
    @IsNumber()
    follower: number;

    @IsNotEmpty()
    @IsNumber()
    total_sales: number;

    @IsNotEmpty()
    @IsNumber()
    earnings: number;

    @IsNotEmpty()
    @IsNumber()
    bank_account: number;
}
