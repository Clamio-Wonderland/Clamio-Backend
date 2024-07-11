import { IsNotEmpty, IsString } from "class-validator";

export class CreateWishlistDto {
    @IsNotEmpty()
    @IsString()
    user_id: number  //to identify the user 

    @IsString()
    @IsNotEmpty()
    product_id: number; // to identify the product
}
