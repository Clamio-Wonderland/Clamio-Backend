import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { Product } from 'src/schema/product-schema';
// import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductService {

  constructor(
    // private uploadService: UploadService
  ){}

  private readonly dataMapper: DataMapper = dataMapper;

  async create(createProductDto: CreateProductDto): Promise<Product> {

    const {
      title,
      description,
      category,
      price,
      thumbnail_url,
      file_url,
      content_type,
      creator_id,
      active
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
      active
    });

    try {
      const savedProduct = await this.dataMapper.put(product);
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Could not create product');
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: String): Promise <Product | undefined> {
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

  async update(id: string, updatedProduct: Partial<Product>): Promise<Product | undefined> {
    let product = await this.findOne(id);

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

  async remove(id: string): Promise<boolean> {
    try {
      await this.dataMapper.delete(Object.assign(new Product(), { id }));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
