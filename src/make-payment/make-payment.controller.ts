import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { MakePaymentService } from './make-payment.service';
import { CreateMakePaymentDto } from './dto/create-make-payment.dto';
import { UpdateMakePaymentDto } from './dto/update-make-payment.dto';

@Controller('make-payment')
export class MakePaymentController {
  constructor(private readonly makePaymentService: MakePaymentService) {}

  @Post()
  create(@Body() createMakePaymentDto: CreateMakePaymentDto, @Req() req,) {
    return this.makePaymentService.create(createMakePaymentDto, req);
  }

  

  // @Get()
  // findAll() {
  //   return this.makePaymentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.makePaymentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMakePaymentDto: UpdateMakePaymentDto) {
  //   return this.makePaymentService.update(+id, updateMakePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.makePaymentService.remove(+id);
  // }
}
