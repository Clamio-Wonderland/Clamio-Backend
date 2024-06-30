import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { CreateProductService } from 'src/product/create-product/create-product.service';

@Controller('create-product')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductService.createProduct(createProductDto);
  }
}
