import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Req } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('creator')
export class CreatorController {
  constructor(
    private readonly creatorService: CreatorService,
  
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createCreatorDto: CreateCreatorDto,@Req() req,
    @UploadedFile() file: Express.Multer.File // Correct file handling
  ) {
    // const userCookie = req.cookies['user'];
    
    // const user = userCookie ? JSON.parse(userCookie) : null;
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
