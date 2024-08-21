import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { Product } from 'src/schema/product-schema';
import { UploadService } from 'src/upload/upload.service';


@Injectable()
export class ProductService {

  constructor(
    private uploadService: UploadService
  ) { }

  private readonly dataMapper: DataMapper = dataMapper;

  async create(createProductDto: CreateProductDto, files): Promise<Product> {

    const {
      title,
      description,

      category,
      price,
      content_type,
      creator_id,
      active
    } = createProductDto;
    const slug = `${title}-${uuidv4()}`;

    const thumbnail_url = await this.uploadService.uploadProductImages(files.images);
    const file_url = await this.uploadService.uploadProduct(files.product[0]);


    const product = Object.assign(new Product(), {
      _id: uuidv4(),
      title,
      description,
      slug,  // Include slug here
      createdon: new Date(),
      updatedon: new Date(),
      category,
      price,
      thumbnail_url,
      file_url,
      content_type,
      creator_id,
      active,
      no_of_time_buyes:0
    });
    try {
      const savedProduct = await this.dataMapper.put(product);
      return savedProduct;
    }

    catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Could not create product');
    }
  }



  async findAll(): Promise<Product[]> {

    const products: Product[] = [];

    try {
      const iterator = this.dataMapper.scan(Product);

      for await (const product of iterator) {
        products.push(product);
      }
      return products
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }



  async findOne(id: string): Promise<Product | undefined> {
    try {
      const product = await this.dataMapper.get(Object.assign(new Product(), { _id: id }));
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
      await this.dataMapper.delete(Object.assign(new Product(), { _id: id }));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async findTopSellingProducts() {
    try{
      const iterator = this.dataMapper.scan(Product);
      const products : Product[]=[];

      for await(const product of iterator){
        products.push(product);
      }

      return this.sortProduct(products);
    }
    catch(error){
      throw error;
    }
  }

  async findHotAndNewProducts(): Promise<Product[]> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - 3);

      console.log(date);
      const iterator = this.dataMapper.scan(Product, {
        filter: {
          type: 'GreaterThanOrEqualTo',
          subject: 'createdon',
          object: date,
        },
      });
      const products: Product[] = [];
  
      for await (const product of iterator) {
        products.push(product);
      }
  
      return products;
    } 
    catch (error) {
      console.error('Error fetching hot and new products:', error);
      throw new Error('Could not fetch hot and new products');
    }
  }
  sortProduct(products: Product[]): Product[] {
    // Sort the products by price in ascending order
    products.sort((a, b) => a.price - b.price);
    
    // If there are 10 or fewer products, return them all
    if (products.length <= 10) {
        return products;
    }
    
    // Otherwise, return the last 10 products
    return products.slice(products.length - 10);
  }
// update average_review 
  updateAverageReview(){
    // body
  }

// update total purchase
  updateTotalPurchase(){
    // body
  }
  
}


