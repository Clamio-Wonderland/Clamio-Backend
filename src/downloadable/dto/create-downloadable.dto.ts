import { IsNotEmpty, IsString } from "class-validator";

export class CreateDownloadableDto {
    @IsNotEmpty()
    @IsString()

    product_id : string;
}
