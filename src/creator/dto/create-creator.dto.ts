import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCreatorDto {

    
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    // @IsNotEmpty()
    @IsString()
    website: string;

    @IsNotEmpty()
    social_link: Record<string, any>;

    @IsNotEmpty()
    @IsString()
    expertise: string;

    @IsNotEmpty()
    // @IsNumber()
    bank_account: number;
}
