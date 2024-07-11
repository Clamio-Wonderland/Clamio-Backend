import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { GetWishListDto } from './dto/get-wish-list.dto';
import { dataMapper } from 'src/config/data-mapper.config';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Wishlist } from 'src/schema/wish-list.schema';

@Injectable()
export class WishlistService {

  private readonly dataMapper: DataMapper = dataMapper;

  async create(createWishlistDto: CreateWishlistDto) {
    const { user_id, product_id } = createWishlistDto;
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

  async findAll(getWishListDto: GetWishListDto) {
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

  // findOne(id: number) {
  //   return `This action returns a #${id} wishlist`;
  // }

  // update(id: number, updateWishlistDto: UpdateWishlistDto) {
  //   return `This action updates a #${id} wishlist`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wishlist`;
  // }
}
