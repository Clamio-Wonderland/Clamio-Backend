import { Injectable } from '@nestjs/common';
import { CreateBookServiceDto } from './dto/create-book-service.dto';
import { UpdateBookServiceDto } from './dto/update-book-service.dto';

@Injectable()
export class BookServiceService {
  create(createBookServiceDto: CreateBookServiceDto) {
    return 'This action adds a new bookService';
  }

  findAll() {
    return `This action returns all bookService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookService`;
  }

  update(id: number, updateBookServiceDto: UpdateBookServiceDto) {
    return `This action updates a #${id} bookService`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookService`;
  }
}
