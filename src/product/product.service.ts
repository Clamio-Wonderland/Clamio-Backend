import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Product } from 'src/schema/product-schema';
import { CreateProductDto } from 'src/dto/createProductDto';
import { dataMapper } from '../config/data-mapper.config';

@Injectable()
export class ProductService {
  private readonly dataMapper: DataMapper = dataMapper;

  constructor() {}

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
    });

    try {
      const savedProduct = await this.dataMapper.put(product);
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Could not create product');
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const product = await this.dataMapper.get(
        Object.assign(new Product(), { id }),
      );
      return product;
    } catch (error) {
      if (error.name === 'ItemNotFoundException') {
        return undefined;
      }
      console.error('Error getting product by ID:', error);
      throw error;
    }
  }

  async updateProduct(
    id: string,
    updatedProduct: Partial<Product>,
  ): Promise<Product | undefined> {
    let product = await this.getProductById(id);

    if (!product) {
      return undefined;
    }

    product = Object.assign(product, updatedProduct);

    try {
      const updated = await this.dataMapper.put(product);
      return updated;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await this.dataMapper.delete(Object.assign(new Product(), { id }));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
