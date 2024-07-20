import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateCommunityDto {
    // @IsNotEmpty()
    // @IsString()
    // id: string  //primary key to uniquely identify the community

    @IsString()
    @IsNotEmpty()
    creator_id: string; // identifies the user who created the particular community

    @IsString()
    @IsNotEmpty()
    name: string; // name of the community

    @IsString()
    description?: string; // optional field to describe the community

    @IsUrl()
    @IsNotEmpty()
    thumbnail_url: string; // URL for community preview page
}
