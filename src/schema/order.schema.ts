import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";

export enum Status {
    ACTIVE = '',
    PENDING = 'Customer started the checkout process',
    AWAITING_PAYMENT = 'Customer has completed the checkout process',
    PROCESSING = 'Order under progress',
    CANCELLED = '',
    FAILED = '',
    SUCCESSFUL = ''
}

export class Item {
    @attribute()
    product_id: string;

    @attribute()
    quantity: number;

    @attribute()
    price: number;

    @attribute()
    added_at: Date;

    @attribute()
    thumbnail_url: string;
}


@table('order')
export class Order {
    @hashKey()
    _id: string;    //order id

    @attribute()
    user_id: string;

    items:Item[]
    
    @attribute()
    purchase_data;

    @attribute()
    amount: number;

    @attribute()
    status: Status;
}