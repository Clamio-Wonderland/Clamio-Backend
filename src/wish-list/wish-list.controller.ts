// src/wish-list/wish-list.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListDto } from './dto/wish-list.dto';
import { GetWishListDto } from './dto/get-wish-list.dto';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Post('addtowishlist')
  async addToWishList(@Body() wishListDto: WishListDto) {
    return this.wishListService.addToWishList(wishListDto);
  }

  @Post('getwishlist')
  async getWishList(@Body() getWishListDto: GetWishListDto) {
    return this.wishListService.getWishList(getWishListDto);
  }
}
