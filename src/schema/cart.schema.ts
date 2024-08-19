import { hashKey, attribute, table } from "@aws/dynamodb-data-mapper-annotations";

@table('cart')
export class Cart {
    @hashKey()
    _id: string;

    @attribute()
    user_id: string;

    @attribute()
    products: Record<string, any>;  
}
