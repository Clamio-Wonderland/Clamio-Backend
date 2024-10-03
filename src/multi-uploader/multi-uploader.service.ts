import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidService } from 'nestjs-uuid';
import { extname } from 'path';

@Injectable()
export class MultiUploaderService {
    private readonly s3Client: S3Client

    // constructor
    constructor(
        private readonly uuidService: UuidService,
        private readonly configService: ConfigService
    ) {
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            }
        })
    }


// =====> UPLOAD MULTIPLE FILES

    // -- private method for uploading each image --
        private async uploadImage(file: Express.Multer.File): Promise<string> {
            const fileName = `${this.uuidService.generate()}.${extname(file.originalname)}`
            try {
                await this.s3Client.send(new PutObjectCommand({
                    Bucket: 'clamio-product-image',
                    Key: `${fileName}`,
                    Body: file.buffer,
                }));
                return `https://clamio-product-image.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${fileName}`
            } catch (error) {
                console.error('Error uploading image:', error);
                throw error;
            }
        }

    // -- MAIN method --
        async multipleFileUploader(files: Express.Multer.File[]): Promise<string[]> {
            const uploadPromises: Promise<string>[] = files.map(file => {
                return this.uploadImage(file);
            });
            return Promise.all(uploadPromises);
        }

// =====> UPLOAD SINGLE FILE

        async singleFileUploader(fileName: string, file: Buffer) {
            const filename = `${this.uuidService.generate()}.${extname(fileName)}`
            try {
                const imageDetails = await this.s3Client.send(
                    new PutObjectCommand({
                        Bucket: 'clamio-image',
                        Key: filename,
                        Body: file,
                    })
                );
                return `https://clamio-image.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${filename}`
            } catch (error) {
                console.error('Error uploading image:', error);
                throw error;
            }
        }


}
