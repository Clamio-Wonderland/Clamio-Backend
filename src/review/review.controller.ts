import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from './dto/pagination-dto';
import { Product } from 'src/schema/product-schema';
import { paginationToken } from 'aws-sdk/clients/supportapp';
import { Review } from 'src/schema/review-schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productId')
  async getReviewsByProductId(
    @Param('productId') productId: string,
    @Query() PaginationDto: PaginationDto,
  ): Promise<Review[]> {
    const { page = 1, limit = 10 } = PaginationDto;
    return this.reviewService.getReviewsByProductId(productId, page, limit);
  }

  @Get('product/user/:productId')
  async getReviewOfProductByUser(
    @Param('productId') ProductId: string,
    @Body('userId') userId: string,
  ) {
    return this.reviewService.getReviewsByProductIdOfUser(ProductId, userId);
  }
}
