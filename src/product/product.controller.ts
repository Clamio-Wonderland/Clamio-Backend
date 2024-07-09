import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/createProductDto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
