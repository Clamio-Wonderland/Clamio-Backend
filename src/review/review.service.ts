import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/schema/review-schema';
import { dataMapper } from 'src/config/data-mapper.config';
import { DataMapper, QueryOptions } from '@aws/dynamodb-data-mapper';

@Injectable()
export class ReviewService {
  private readonly dataMapper: DataMapper;
  constructor() {
    this.dataMapper = dataMapper;
  }

  async getReviewsByProductId(
    productId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Review[]> {
    let lastkey;
    let data: Review[] = [];
    let skip = (page - 1) * limit;

    try {
      const paginator = this.dataMapper.query(
        Review,
        { productId },
        { limit, startKey: lastkey },
      );

      for await (const review of paginator) {
        if (skip > 0) {
          skip--;
          continue;
        }
        data.push(review);
        if (data.length === limit) {
          //@ts-ignore
          lastkey = paginator.lastEvaluatedKey;
          break;
        }
      }

      if (data.length === 0)
        throw new NotFoundException('Error fetching reviews.');

      return data;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error fetching reviews.');
    }
  }

  async getReviewsByProductIdOfUser(productId: string, userId: string) {
    const reviews: Review[] = [];

    const query: QueryOptions = {
      filter: {
        type: 'Equals',
        subject: 'userId',
        object: userId,
      },
    };

    try {
      for await (const review of this.dataMapper.query(
        Review,
        { productId },
        query,
      )) {
        reviews.push(review);
      }

      if (reviews.length === 0) {
        return {
          message: `No reviews found for product Id ${productId} and by user Id ${userId}`,
        };
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error fetching reviews.');
    }
  }
}
