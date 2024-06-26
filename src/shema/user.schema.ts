import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument ,Types} from "mongoose";


export type UserDocument=HydratedDocument<User>

export class User{
    @Prop({type:Types.ObjectId,required:true})
    user_id:Types.ObjectId

    @Prop({required : true})
    username:string

    @Prop({required : true})
    email:string

    @Prop({required : false})
    password:string

    @Prop({required:false})
    bio : string

    @Prop({required : true})
    profile_picture : string

    @Prop ({required : true})
    creator : Boolean


}