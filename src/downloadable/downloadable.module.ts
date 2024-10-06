import { Module } from '@nestjs/common';
import { DownloadableService } from './downloadable.service';
import { DownloadableController } from './downloadable.controller';

@Module({
  controllers: [DownloadableController],
  providers: [DownloadableService],
})
export class DownloadableModule {}
