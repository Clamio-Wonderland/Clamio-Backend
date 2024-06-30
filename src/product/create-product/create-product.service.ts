import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';


@Injectable()
export class CreateProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    
    return createProductDto;
  }
}
