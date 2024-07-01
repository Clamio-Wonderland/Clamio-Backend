import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { Product } from 'src/schema/product-schema';
import { CreateProductDto } from 'src/dto/createProductDto';

// import { Product } from './product.entity';
// import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  private mapper: DataMapper;

  constructor() {
    this.mapper = new DataMapper({ client: new DynamoDB() });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      title,
      description,
      category,
      price,
      thumbnail_url,
      file_url,
      content_type,
      creator_id,
      is_active,
    } = createProductDto;
    const slug = `${title}-${uuidv4()}`;

    const product = Object.assign(new Product(), {
      title,
      description,
      category,
      price,
      thumbnail_url,
      file_url,
      content_type,
      creator_id,
      is_active,
      slug,
    });

    try {
      const savedProduct = await this.mapper.put(product);
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Could not create product');
    }
  }
}
