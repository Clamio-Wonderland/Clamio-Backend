import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { user } from 'src/schema/user-schema';
import { JsonWebTokenError } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('creator')
export class CreatorController {
  constructor(
    private readonly creatorService: CreatorService,

  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createCreatorDto: CreateCreatorDto, @Req() req,
    @UploadedFile() file: Express.Multer.File // Correct file handling
  ) {
    let userCookie = req.cookies['user'];
    if(!userCookie){
      throw new BadRequestException('user cookies is not set');
    }

    if(!file){
      throw new BadRequestException('avatar is not set');
    }

    const cook = JSON.parse(userCookie)
    
    return this.creatorService.create(createCreatorDto, file, cook.id);

  }


  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.creatorService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.creatorService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.creatorService.remove(id);
  }
}
