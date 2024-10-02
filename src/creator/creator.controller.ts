import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

@Controller('creator')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar')) // Intercepting the uploaded file
  create(
    @Body() createCreatorDto: CreateCreatorDto,
    @UploadedFile() file: Express.Multer.File // Handling the uploaded file
  ) {
    console.log(createCreatorDto);
    return this.creatorService.create(createCreatorDto, file);
  }


  @Get()
  findAll() {
    return this.creatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creatorService.remove(id);
  }
}
