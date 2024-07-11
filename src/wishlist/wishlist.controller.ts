import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { GetWishListDto } from './dto/get-wish-list.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('addToWishlist')
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get('getWishlist')
  findAll(@Body() getWishListDto: GetWishListDto) {
    return this.wishlistService.findAll(getWishListDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.wishlistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
  //   return this.wishlistService.update(+id, updateWishlistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.wishlistService.remove(+id);
  // }
}
