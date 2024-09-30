import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookServiceService } from './book-service.service';
import { CreateBookServiceDto } from './dto/create-book-service.dto';
import { UpdateBookServiceDto } from './dto/update-book-service.dto';

@Controller('book-service')
export class BookServiceController {
  constructor(private readonly bookServiceService: BookServiceService) {}

  @Post()
  create(@Body() createBookServiceDto: CreateBookServiceDto) {
    return this.bookServiceService.create(createBookServiceDto);
  }

  @Get()
  findAll() {
    return this.bookServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookServiceDto: UpdateBookServiceDto) {
    return this.bookServiceService.update(+id, updateBookServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookServiceService.remove(+id);
  }
}
