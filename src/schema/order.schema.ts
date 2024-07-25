import { attribute, hashKey, table } from "@aws/dynamodb-data-mapper-annotations";

export enum Status {
    ACTIVE = '',
    PENDING = 'Customer started the checkout process',
    AWAITING_PAYMENT = 'Customer has completed the checkout process',
    PROCESSING = 'Order under progress',
    CANCELLED = '',
    FAILED = ''
}

@table('order')
export class Order {
    @hashKey()
    _id: string;    //order id

    @attribute()
    user_id: string;
    
    @attribute()
    product_id: string;

    @attribute()
    created_at: Date;

    @attribute()
    updated_at: Date;

    @attribute()
    amount: number;

    @attribute()
    status: Status;
}