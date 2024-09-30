import { PartialType } from '@nestjs/swagger';
import { CreateBookServiceDto } from './create-book-service.dto';

export class UpdateBookServiceDto extends PartialType(CreateBookServiceDto) {}
