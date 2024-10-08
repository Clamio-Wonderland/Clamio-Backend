import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

export enum Status {
  ACTIVE = '',
  PENDING = 'Customer started the checkout process',
  AWAITING_PAYMENT = 'Customer has completed the checkout process',
  PROCESSING = 'Order under progress',
  CANCELLED = '',
  FAILED = '',
  SUCCESSFUL = 'Payment Successfull',
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
  images_url: string [];


  @attribute()
  title: string;

  constructor(
    product_id: string,
    quantity: number,
    price: number,
    added_at: Date,
    images_url: string [],
    title: string
  ) {
    this.product_id = product_id;
    this.quantity = quantity;
    this.price = price;
    this.added_at = added_at;
    this.images_url = images_url;
    this.title = title
  }
}

@table('order')
export class Order {
  @hashKey()
  _id: string; //order id

  @attribute()
  user_id: string;

  @attribute()
  items: Item[];

  @attribute()
  purchase_date: Date;

  @attribute()
  amount: number;

  @attribute()
  status: Status;
}