import { IsOptional, IsString } from "class-validator";


export class UpdateCreatorDto {
  
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    
    description: string;

    
    
    website: string;

    
    
    avatar: string;

    
    social_link: Record<string, any>;

    
    
    expertise: string;
    
    
    bank_account: number;
}
