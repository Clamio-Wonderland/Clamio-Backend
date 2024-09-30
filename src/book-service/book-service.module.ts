import { Module } from '@nestjs/common';
import { BookServiceService } from './book-service.service';
import { BookServiceController } from './book-service.controller';

@Module({
  controllers: [BookServiceController],
  providers: [BookServiceService],
})
export class BookServiceModule {}
