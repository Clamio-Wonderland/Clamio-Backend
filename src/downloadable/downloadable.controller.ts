import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DownloadableService } from './downloadable.service';
import { CreateDownloadableDto } from './dto/create-downloadable.dto';
import { UpdateDownloadableDto } from './dto/update-downloadable.dto';

@Controller('downloadable')
export class DownloadableController {
  constructor(private readonly downloadableService: DownloadableService) {}

  @Post()
  create(@Body() createDownloadableDto: CreateDownloadableDto) {
    return this.downloadableService.create(createDownloadableDto);
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
}
