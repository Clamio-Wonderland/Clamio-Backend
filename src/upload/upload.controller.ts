import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(
        private readonly uploadService: UploadService
    ){}

    // POST || Creator Profile Image Upload
        @Post('upload-creator-profile')
        @UseInterceptors(FileInterceptor('file'))
        async uploadAvatar(@UploadedFile(
                                        new ParseFilePipe({
                                            validators: [
                                                // new MaxFileSizeValidator({ maxSize: 1000000}),
                                                new FileTypeValidator({  fileType: /^image\/(jpg|jpeg|png)$/ })
                                            ]
                                        })
                                    ) file: Express.Multer.File
                        )
        {
            const rslt = await this.uploadService.uploadCreatorProfile(file.originalname, file.buffer)
            return rslt;
        }

    // POST || Product Images Upload
        @Post('upload-product-images')
        @UseInterceptors(FilesInterceptor('images', 4))
        async uploadImages(@UploadedFiles(
                                            new ParseFilePipe({
                                                validators: [
                                                    // new MaxFileSizeValidator({ maxSize: 1000000}),
                                                    new FileTypeValidator({  fileType: /^image\/(jpg|jpeg|png)$/ })
                                                ]
                                            })
        ) files: Express.Multer.File[]): Promise<string[]> {
            const imageUrls = await this.uploadService.uploadProductImages(files);
            return imageUrls;
        }
}
