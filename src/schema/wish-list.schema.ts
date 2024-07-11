import { attribute, table } from "@aws/dynamodb-data-mapper-annotations";

@table('wishlist')
export class Wishlist {
    @attribute()
    user_id: number;

    @attribute()
    product_id: number;
}
