import { File } from 'buffer';
import { IsBoolean, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ProductCategory } from 'src/schema/product-schema';

export class GetProductByCreatorId {

    @IsString()
    @IsNotEmpty()
    creator_id: string;


}
