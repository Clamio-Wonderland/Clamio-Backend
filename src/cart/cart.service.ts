import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DataMapper, ItemNotFoundException } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { ProductService } from 'src/product/product.service';
import { v4 as uuidv4 } from 'uuid';
import { Cart, Product } from 'src/schema/cart.schema';



@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,) {

  }
  private readonly dataMapper: DataMapper = dataMapper;
  async create(createCartDto: CreateCartDto, user_id: string) {
    const { product_id} = createCartDto;

    try {
       
        const productDetails = await this.productService.findOne(product_id);
        if (!productDetails) {
            throw new Error("Give a valid product ID");
        }

   
        const iterator = this.dataMapper.scan(Cart, {
            filter: {
                type: 'Equals',
                subject: 'user_id',
                object: user_id
            }
        });

        const carts = [];
        for await (const crt of iterator) {
            carts.push(crt);
        }

 
        if (carts.length > 0) {
            const existingCart = carts[0];

       
            const productInCart = existingCart.products.find(
                (product) => product.product_id === product_id
            );
            if (productInCart) {
                return "This product is already in the cart";
            }

            
            const product = new Product(
                product_id,
                productDetails.price,
                new Date(),
                productDetails.product_url,
                productDetails.creator_id,
                productDetails.creator_name
            );

            existingCart.products.push(product);
            existingCart.total_amount = existingCart.total_amount+productDetails.price;

          
            return await this.dataMapper.put(existingCart);
        } else {
            
            const newCart = new Cart();
            newCart._id = uuidv4(); 
            newCart.user_id = user_id;
            newCart.products = [
                new Product(
                    product_id,
                    productDetails.price,
                    new Date(),
                    productDetails.product_url,
                    productDetails.creator_id,
                    productDetails.creator_name
                )
            ];
            newCart.total_amount = productDetails.price;

            const result = await this.dataMapper.put(newCart);
            return result;
        }
    } catch (error) {
        throw new Error(`Error creating cart: ${error.message}`);
    }
}


  async findAll() {
    try {
      const iterator = await this.dataMapper.scan(Cart);

      const carts = [];

      for await (const cart of iterator) {
        carts.push(cart);
      }
      if(carts.length === 0){
        return {message : "cart is empty"};
      }
      return carts;
    }
    catch (error) {
      throw error;
    }

  }

  async findOne(id: string) {
    try {
      const result = await this.dataMapper.get(Object.assign(new Cart, { _id: id }));
      return result;
    }
    catch (error) {
      if (error.name === 'ItemNotFoundException') {
        return "No item exists with this cart_id"; 
      }
      throw error;
    }
  }

  // update(id: string, updateCartDto: UpdateCartDto) {
    
  // }

  async removeAll(user_id: string) {
    try {
      const iterator = this.dataMapper.scan(Cart,{
        filter:{
          type: 'Equals',
          subject: 'user_id',
          object: user_id
        }
      });
      const carts = [];
      for await(const cart of iterator){
        carts.push(cart);
      }
      const result = await this.dataMapper.delete(Object.assign(new Cart, {_id:carts[0]._id}));

      return result;
    } 
    catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }

  async remove(product_id: string, user_id: string) {
    const iterator = this.dataMapper.scan(Cart, {
        filter: {
            type: 'Equals',
            subject: 'user_id',
            object: user_id
        }
    });

    let carts = [];

    for await (const crt of iterator) {
        carts.push(crt);
    }

    // Check if the cart exists
    if (carts.length === 0) {
        throw new Error("No cart found for this user.");
    }

    const existingCart = carts[0]; 
    const initialProductCount = existingCart.products.length;

    existingCart.products = existingCart.products.filter(product => product.product_id !== product_id);

    
    if (existingCart.products.length < initialProductCount) {
        existingCart.total_amount -= existingCart.products.find(product => product.product_id === product_id)?.price || 0;
    } else {
        throw new Error("Product not found in the cart.");
    }

   
    await this.dataMapper.put(existingCart);
    return existingCart;
}


 
}
