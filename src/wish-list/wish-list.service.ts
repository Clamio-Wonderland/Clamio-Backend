// src/wish-list/wish-list.service.ts
import { Injectable } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { GetWishListDto } from './dto/get-wish-list.dto';
import { WishListDto } from './dto/wish-list.dto';
import { dataMapper } from '../config/data-mapper.config'; // Adjust the import path according to your project structure
import { Wishlist } from '../schema/wish-list.schema';

@Injectable()
export class WishListService {
  private readonly dataMapper: DataMapper = dataMapper;

  async addToWishList(wishListDto: WishListDto) {
    const { user_id, product_id } = wishListDto;
    const wishListItem = Object.assign(new Wishlist(), {
      user_id,
      product_id,
    });

    try {
      const savedItem = await this.dataMapper.put(wishListItem);
      return savedItem;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw new Error('Could not add to wishlist');
    }
  }

  async getWishList(getWishListDto: GetWishListDto) {
    const { user_id } = getWishListDto;

    // Logic to retrieve the wish list for the user
    try {
      const query = this.dataMapper.query(
        Wishlist,
        { user_id },
        { indexName: 'UserIdIndex' }, // Assuming you have an index on user_id
      );

      const wishListItems = [];
      for await (const item of query) {
        wishListItems.push(item);
      }

      return wishListItems;
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      throw new Error('Could not retrieve wishlist');
    }
  }
}
