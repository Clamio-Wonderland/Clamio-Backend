import { Injectable } from '@nestjs/common';
import { CreateDownloadableDto } from './dto/create-downloadable.dto';
import { UpdateDownloadableDto } from './dto/update-downloadable.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config'
import { Product } from 'src/schema/product-schema';
import { createReadStream } from 'fs';
import { OrderService } from 'src/order/order.service';
import { BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';


@Injectable()
export class DownloadableService {
  constructor(
    private readonly orderService: OrderService,
  ) {

  }
  private readonly dataMapper: DataMapper = dataMapper;

  create(createDownloadableDto: CreateDownloadableDto, user_id: string) {
    const { product_id } = createDownloadableDto;


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

  async handleDownload(product_id: string, res, user_id: string, req: Request ) {
    try {
      // const ordersByUser = await this.orderService.getUserOrders(req);
      const product = await this.dataMapper.get(Object.assign(new Product(), { _id: product_id }));
      console.log(product);
  
      if (!product) {
        throw new BadRequestException('Product not found');
      }
  
      let isValidOrder = true;
  
      if (isValidOrder) {
        const fileUrl = product.product_url;
        console.log(fileUrl);
        const fileKey = fileUrl.split('/').pop(); 
  
        const s3 = new S3();
  
        const s3Params = {
          Bucket: 'clamio-image', 
          Key: fileKey,  
        };
  
        const fileStream = s3.getObject(s3Params).createReadStream();
        
        res.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${product.title}.${product.content_type}"`,
        });
  
        fileStream.pipe(res);
      } else {
        return "Please order the product first.";
      }
  
    } catch (error) {
      console.error('Error during file download:', error); // Log the error for debugging
      throw new BadRequestException('Error during file download');
    }
  }
  



  

 
  
}
