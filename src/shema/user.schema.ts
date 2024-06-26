import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument=HydratedDocument<User>

export class User{
    @Prop({required:true})
    user_id:Number

    @Prop({required : true})
    username:string

    @Prop({required : true})
    email:string

    @Prop({required : false})
    password:string

    @Prop()
    bio : string

    @Prop({required : true})
    profile_picture : string

    @Prop ({required : true})
    creator : Boolean


}