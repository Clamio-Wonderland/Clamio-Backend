import { Controller, FileTypeValidator, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MultiUploaderService } from './multi-uploader.service';

@Controller('multi-uploader')
export class MultiUploaderController {
    constructor(private readonly multiUploaderService: MultiUploaderService) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'productFile', maxCount: 1 }, // Product file
            { name: 'productImg', maxCount: 4 },  // Product images
        ]),
    )
    async uploadAvatar(
        @UploadedFiles()
            files: { 
                productFile?: Express.Multer.File[]; 
                productImg?: Express.Multer.File[] 
            },
    ) {
        
        const productFile = files.productFile?.[0]; 
        const productImages = files.productImg || []; 

        if (!productFile) {
            throw new Error('Product file not uploaded');
        }


        const result = await this.multiUploaderService.singleFileUploader(productFile.originalname,productFile.buffer,);
        const imageUrls = await this.multiUploaderService.multipleFileUploader(productImages);

        return {
            result, //  Product file
            imageUrls, // Array of image URLs
        };
    }
}
