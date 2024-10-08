import { Controller, Get, Post, Body, Patch, Param, Delete, Req,Res, UseGuards } from '@nestjs/common';
import { DownloadableService } from './downloadable.service';
import { CreateDownloadableDto } from './dto/create-downloadable.dto';
import { UpdateDownloadableDto } from './dto/update-downloadable.dto';
import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@Controller('downloadable')
export class DownloadableController {
  constructor(private readonly downloadableService: DownloadableService) {

  }

  @Post()
  create(@Body() createDownloadableDto: CreateDownloadableDto, @Req() req) {
    let useCookie = req.cookies['user'];
    useCookie = JSON.parse(useCookie);
    return this.downloadableService.create(createDownloadableDto, useCookie.id);
  }

  @Get()
  findAll() {
    return this.downloadableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.downloadableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDownloadableDto: UpdateDownloadableDto) {
    return this.downloadableService.update(+id, updateDownloadableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.downloadableService.remove(+id);
  }

  
  @Get('/download/:product_id')
  @UseGuards(JwtAuthGuard)
  async download(
    @Param('product_id') product_id: string,
    @Req() req, @Res()res
  ) {

   
    let userCookie = req.cookies['user'];
    if (!userCookie) {
      throw new BadRequestException('User not authenticated');
    }

    
    userCookie = JSON.parse(userCookie);


    return await this.downloadableService.handleDownload(product_id, res,userCookie.id, req);

  }

}
