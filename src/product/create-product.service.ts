import { Injectable } from '@nestjs/common';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Product } from 'src/schema/creators.schema';
// import { DataMapper  } from '@aws/dynamodb-data-mapper';
@Injectable()
export class ProductService {
  constructor(private readonly dynamoDB: DynamoDB) {
    this.dynamoDB = new DynamoDB({ region: 'us-east-1' }); // Replace with your AWS region
  }

  async createProduct(product: Product): Promise<Product> {
    const params = {
      TableName: 'Products', // Replace with your DynamoDB table name
      Item: marshall(product),
    };

    try {
      await this.dynamoDB.putItem(params);
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const params = {
      TableName: 'Products',
      Key: marshall({ id }),
    };

    try {
      const data = await this.dynamoDB.getItem(params);
      if (!data.Item) return undefined;

      return unmarshall(data.Item) as Product;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  }

  async updateProduct(
    id: number,
    updatedProduct: Partial<Product>,
  ): Promise<Product | undefined> {
    let product = await this.getProductById(id);

    if (!product) {
      return undefined;
    }

    product = { ...product, ...updatedProduct };

    const params = {
      TableName: 'Products',
      Item: marshall(product),
    };

    try {
      await this.dynamoDB.putItem(params);
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const params = {
      TableName: 'Products',
      Key: marshall({ id }),
    };

    try {
      await this.dynamoDB.deleteItem(params);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
