import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class WishListDto {

    @IsNotEmpty()
    @IsString()
    user_id: number  //to identify the user 

    @IsString()
    @IsNotEmpty()
    product_id: number; // to identify the product

   
}
