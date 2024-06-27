import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
    // MongoDB generates the primary key (_id) automatically

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Review', required: true })
    review_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Comment', required: true })
    comment_id: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
