import { Injectable } from '@nestjs/common';
import { CreateDownloadableDto } from './dto/create-downloadable.dto';
import { UpdateDownloadableDto } from './dto/update-downloadable.dto';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { dataMapper } from 'src/config/data-mapper.config'
import { Product } from 'src/schema/product-schema';
import { createReadStream } from 'fs';
import { OrderService } from 'src/order/order.service';
import { BadRequestException } from '@nestjs/common';

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





  async handleDownload(product_id: string, res, user_id: string) {
    try {

      const ordersByUser = await this.orderService.getUserOrders(user_id);

      const product = await this.dataMapper.get(Object.assign(new Product, { _id: product_id }));



      if (!product) {
        throw new BadRequestException('Product not found');
      }


      let isValidOrder = true;
      // for (let i = 0; i < ordersByUser.length; i++) {

      //   if (ordersByUser[i].items.find(item => item.product_id === product_id)) {
      //     isValidOrder = true;
      //     break;
      //   }
      // }

      if (isValidOrder) {
        
        
        const file_url = product.file_url[0];

        const fileStream = await createReadStream(file_url);
        res.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${product.title}.${product.content_type}"`
         
        });

        fileStream.pipe(res);
      }
      else{
        return "ordered product first";
      }



    } catch (error) {
      console.error('Error during file download:', error); // Log the error for debugging
      throw new BadRequestException('Error during file download');
    }
  }


}
