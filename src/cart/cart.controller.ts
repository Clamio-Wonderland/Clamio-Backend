import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { error } from 'console';
import { prototype } from 'events';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //  add to cart single or multiple product product should
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCartDto: CreateCartDto ,@Req() req) {
    let userCookie = req.cookies['user'];
    if(!userCookie){
      throw new BadRequestException('cookies is not set');
    }
    userCookie =  JSON.parse(userCookie);
    return this.cartService.create(createCartDto,userCookie.id);
  }

  // get all products in the cart
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.cartService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // // few products exist in the database and you want to add few more then we would use 
  // @Patch()
  // updateAll(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(id, updateCartDto);
  // }

  @Delete()
  @UseGuards(JwtAuthGuard)
  removeAll(@Req() req) {
    let userCookie = req.cookies['user'];
    if(!userCookie){
      throw new BadRequestException('cookies is not set');
    }
    userCookie =  JSON.parse(userCookie);
    return this.cartService.removeAll(userCookie.id);
  }

  

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') product_id:string,@Req()req){
    let userCookie = req.cookies['user'];
    if(!userCookie){
      throw new BadRequestException('cookies is not set');
    }
    userCookie =  JSON.parse(userCookie);
    return this.cartService.remove(product_id,userCookie.id);
  }
  

}
