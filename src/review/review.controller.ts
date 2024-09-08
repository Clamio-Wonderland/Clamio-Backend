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
import { PaginationDto } from './dto/pagination-dto';
import { Product } from 'src/schema/product-schema';
import { paginationToken } from 'aws-sdk/clients/supportapp';
import { Review } from 'src/schema/review-schema';
import { PurchaseCheckMiddler } from 'src/middleware/purchase-check-middleware';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  @Post('product/user/createReview/:productId')
  async giveReview(
    @Param('productId') ProductId: string,
    @Body() CreateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.createReview(ProductId, CreateReviewDto);
  }

  @Post('product/user/updateReview/:productId')
  async updateReview(
    @Param('productId') productId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(productId, updateReviewDto);
  }

  @Get('product/user/:productId')
  async getReviewOfProductByUser(
    @Param('productId') ProductId: string,
    @Body('userId') userId: string,
  ) {
    return this.reviewService.getReviewsByProductIdOfUser(ProductId, userId);
  }
}
