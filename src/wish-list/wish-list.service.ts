// src/wish-list/wish-list.service.ts
import { Injectable } from '@nestjs/common';
import { GetWishListDto } from './dto/get-wish-list.dto';
import { WishListDto } from './dto/wish-list.dto';

@Injectable()
export class WishListService {
  async addToWishList(wishListDto: WishListDto) {
    console.log(wishListDto);
    const { user_id, product_id } = wishListDto;
    console.log(user_id + ' ' + product_id);
    // Logic to add the item to the wish list
    return wishListDto;
  }

  async getWishList(getWishList: GetWishListDto) {
    const { user_id } = getWishList;
    console.log(user_id);
    // Logic to retrieve the wish list for the user
    return getWishList;
  }
}
