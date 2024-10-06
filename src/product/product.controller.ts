import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, FileValidator } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { GetProductByCreatorId } from './dto/getProductByCreatorId.dto';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {

    return this.productService.findAll();
  }


  @Post()
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
        { name: 'productFile', maxCount: 1 }, // Product file
        { name: 'productImg', maxCount: 4 },  // Product images
    ]),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
            files: { 
                productFile?: Express.Multer.File[]; 
                productImg?: Express.Multer.File[] 
            },
  ) {
    console.log('Files:', files);  // Debug the received files
    return this.productService.create(createProductDto, files);
  }
  


  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(id, updateProductDto);
  // }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Get('filter/topSellingProduct')
  // @UseGuards(JwtAuthGuard)
  findTopSellingProducts() {

    return this.productService.findTopSellingProducts();
  }

  @Get('filter/hotAndNewProduct')
  // @Get('/hotAndNewProduct')
  // @UseGuards(JwtAuthGuard)
  findHotAndNewProducts() {


    return this.productService.findHotAndNewProducts();
  }

  @Post('/getProductByCreatorId')
  
  getProduct(@Body() getProductByCreatorId:GetProductByCreatorId){
    console.log(getProductByCreatorId);

    return this.productService.getProductByCreatorId(getProductByCreatorId);

  }

}