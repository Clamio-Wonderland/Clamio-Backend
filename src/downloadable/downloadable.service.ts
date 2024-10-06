import { Injectable } from '@nestjs/common';
import { CreateDownloadableDto } from './dto/create-downloadable.dto';
import { UpdateDownloadableDto } from './dto/update-downloadable.dto';

@Injectable()
export class DownloadableService {
  create(createDownloadableDto: CreateDownloadableDto) {
    return 'This action adds a new downloadable';
  }

  findAll() {
    return `This action returns all downloadable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} downloadable`;
  }

  update(id: number, updateDownloadableDto: UpdateDownloadableDto) {
    return `This action updates a #${id} downloadable`;
  }

  remove(id: number) {
    return `This action removes a #${id} downloadable`;
  }
}
