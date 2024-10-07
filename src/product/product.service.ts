import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config';
import { Product } from 'src/schema/product-schema';
import { UploadService } from 'src/upload/upload.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectLockEnabled } from '@aws-sdk/client-s3';
import { MultiUploaderService } from 'src/multi-uploader/multi-uploader.service';
import { GetProductByCreatorId } from './dto/getProductByCreatorId.dto';
import { Creator } from 'src/schema/creators.schema';


@Injectable()
export class ProductService {

  constructor(
    private uploadService: UploadService,
    private readonly multiUploaderService: MultiUploaderService
  ) { }

  private readonly dataMapper: DataMapper = dataMapper;

  async create(createProductDto: CreateProductDto, files) {
    console.log(createProductDto);
    const {
      title,
      description,
      category,
      price,
      content_type,
      creator_id,
      creator_name
    } = createProductDto;
    const slug = `${title}-${uuidv4()}`;

    const productFile = files.productFile?.[0];
    const productImages = files.productImg || [];

    if (!productFile) {
      throw new Error('Product file not uploaded');
    }

    const product_url = await this.multiUploaderService.singleFileUploader(productFile.originalname, productFile.buffer,);
    const images_url = await this.multiUploaderService.multipleFileUploader(productImages);


    const product = Object.assign(new Product(), {
      _id: uuidv4(),
      title,
      description,
      slug,
      createdon: new Date(),
      updatedon: new Date(),
      category,
      price,
      product_url,
      images_url,
      content_type,
      creator_id,
      active: true,
      total_purchase: 0,
      creator_name
    });

    try {
      const savedProduct = await this.dataMapper.put(product);
      return savedProduct;
    }

    catch (error) {
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
    try {
      const iterator = this.dataMapper.scan(Product);
      const products: Product[] = [];

      for await (const product of iterator) {
        products.push(product);
      }

      return this.sortProduct(products);
    }
    catch (error) {
      throw error;
    }
  }

  async findHotAndNewProducts(): Promise<Product[]> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - 3);


      const iterator = this.dataMapper.scan(Product);
      const products: Product[] = [];

      for await (const product of iterator) {
        if (product.createdon >= date) {
          products.push(product)
        }
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

  update_average_review() {

  }


  // update total purchase

  async update_total_purchase(_id: string) {
    try {
      // Retrieve the product using the findOne method
      const product = await this.findOne(_id);

      // Increment the total_purchase attribute
      product.total_purchase += 1;

      // Update the product in the database
      return await this.dataMapper.put(product);
    } catch (error) {
      // Handle any errors that occur during the process
      throw error;
    }
  }

  async getProductByCreatorId(getProductByCreatorId:GetProductByCreatorId):Promise< Product[]> {
    const {creator_id} = getProductByCreatorId;
    console.log(creator_id)
    const iterator = this.dataMapper.scan(Product, {
      filter: {
        type: 'Equals',
        subject: 'creator_id',
        object: creator_id,
      },
    });



    const products: Product[] = [];

    for await (const product of iterator) {

      products.push(product)

    }
    return products;

  }

}

