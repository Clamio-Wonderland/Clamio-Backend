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

<<<<<<< HEAD
    @attribute()
    invoice_id:string

    @attribute()
    price: number;
=======
  @attribute()
  price: number;
>>>>>>> 77dea7f95165a043b8ce64613472b36ac6bc37b0

  @attribute()
  added_at: Date;

  @attribute()
  images_url: string [];

<<<<<<< HEAD
    @attribute()
    status:string

    @attribute()
    creator_id

    @attribute()
    creator_name

    @attribute()
    purchase_date

    constructor(product_id,quantity,invoice_id,price,added_at,thumbnail_url,status,creator_id,creator_name,purchase_date){
        this.product_id = product_id;
        this.quantity=quantity;
        this.invoice_id = invoice_id;
        this.price = price;
        this.added_at=added_at;
        this.thumbnail_url = thumbnail_url;
        this.status=status;
        this.creator_id=creator_id;
        this.creator_name=creator_name;
        this.purchase_date=purchase_date;
    }
}




=======

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

>>>>>>> 77dea7f95165a043b8ce64613472b36ac6bc37b0
@table('order')
export class Order {
  @hashKey()
  _id: string; //order id

  @attribute()
  user_id: string;

<<<<<<< HEAD
    @attribute()
    items:Item[]
    
    // @attribute()
    // purchase_date : Date;

    // @attribute()
    // amount: number;

    // @attribute()
    // status: Status;
}
=======
  @attribute()
  items: Item[];

  @attribute()
  purchase_date: Date;

  @attribute()
  amount: number;

  @attribute()
  status: Status;
}
>>>>>>> 77dea7f95165a043b8ce64613472b36ac6bc37b0
