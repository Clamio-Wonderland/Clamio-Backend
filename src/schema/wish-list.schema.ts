import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";

@table('wishlist')
export class Wishlist {
    @hashKey()
    user_id: string;

    @attribute()
    product_id: string[];
}
