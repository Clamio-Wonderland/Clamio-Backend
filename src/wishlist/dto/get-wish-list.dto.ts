import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class GetWishListDto {

    @IsNotEmpty()
    @IsString()
    user_id: number  //to identify the user 

   
}
