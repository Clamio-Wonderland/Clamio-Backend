import { PartialType } from '@nestjs/swagger';
import { CreateDownloadableDto } from './create-downloadable.dto';

export class UpdateDownloadableDto extends PartialType(CreateDownloadableDto) {}
