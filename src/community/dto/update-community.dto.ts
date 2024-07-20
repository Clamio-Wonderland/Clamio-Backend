import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class UpdateCommunityDto {
    // @IsNotEmpty()
    // @IsString()
    // id: string  //primary key to uniquely identify the community

    // @IsString()
    creator_id: string; // identifies the user who created the particular community

    // @IsString()
    name: string; // name of the community

    // @IsString()
    description?: string; // optional field to describe the community

    // @IsUrl()
    thumbnail_url: string; // URL for community preview page
}
