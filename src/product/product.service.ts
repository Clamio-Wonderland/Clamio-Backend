import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { Product } from 'src/schema/product-schema';
import { UploadService } from 'src/upload/upload.service';
import { Review } from 'src/schema/review-schema';

@Injectable()
export class ProductService {
  constructor(private uploadService: UploadService) {}

  private readonly dataMapper: DataMapper = dataMapper;

  async create(createProductDto: CreateProductDto, files): Promise<Product> {
    const {
      title,
      description,
      category,
      price,
      content_type,
      creator_id,
      active,
    } = createProductDto;
    const slug = `${title}-${uuidv4()}`;

    const thumbnail_url = await this.uploadService.uploadProductImages(
      files.images,
    );
    const file_url = await this.uploadService.uploadProduct(files.product[0]);

    const product = Object.assign(new Product(), {
      _id: uuidv4(),
      title,
      description,
      slug, // Include slug here
      createdon: new Date(),
      updatedon: new Date(),
      category,
      price,
      thumbnail_url,
      file_url,
      content_type,
      creator_id,
      active,
    });

    try {
      const savedProduct = await this.dataMapper.put(product);
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Could not create product');
    }
  }

  async findAllReviews(productId: string, page: number, limit: number) {
    const reviews: Review[] = [];
    const skip = (page - 1) * limit;

    try {
      // Fetch reviews for the product with pagination
      const iterator = this.dataMapper.query(
        Review,
        { productId },
        {
          limit,
          startKey: skip > 0 ? { productId, _id: skip } : undefined,
        },
      );

      for await (const review of iterator) {
        reviews.push(review);
      }

      // Count the total number of reviews for the product
      const total = reviews.length;

      return {
        reviews,
        total,
        page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = [];

    try {
      const iterator = this.dataMapper.scan(Product);

      for await (const product of iterator) {
        products.push(product);
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Product | undefined> {
    try {
      const product = await this.dataMapper.get(
        Object.assign(new Product(), { _id: id }),
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

  async update(
    id: string,
    updatedProduct: Partial<Product>,
  ): Promise<Product | undefined> {
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
      await this.dataMapper.delete(Object.assign(new Product(), { _id: id }));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async findTopSellingProducts(page: number, limit: number) {
    // Implement logic to return top-selling products with pagination
    // Assuming you have a mechanism to track product sales
    const products: Product[] = [];
    const skip = (page - 1) * limit;

    try {
      const iterator = this.dataMapper.scan(Product, {
        limit,
        startKey: skip > 0 ? { _id: skip } : undefined,
        // Apply your filtering logic here
      });

      for await (const product of iterator) {
        // Filter and sort logic based on sales data
        products.push(product);
      }
      return {
        products,
        total: products.length,
        page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching top-selling products:', error);
      throw error;
    }
  }

  async findHotAndNewProducts(page: number, limit: number) {
    // Implement logic to return hot and new products with pagination
    // Sort by creation timestamp
    const products: Product[] = [];
    const skip = (page - 1) * limit;

    try {
      const iterator = this.dataMapper.scan(Product, {
        limit,
        startKey: skip > 0 ? { _id: skip } : undefined,
        // Sort by created timestamp logic here
      });

      for await (const product of iterator) {
        // Apply sorting and filtering logic for hot and new products
        products.push(product);
      }
      return {
        products,
        total: products.length,
        page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching hot and new products:', error);
      throw error;
    }
  }
}
