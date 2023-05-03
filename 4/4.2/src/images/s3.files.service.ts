import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3FilesService {
  async getFileByName(res: Response, fileName: string) {
    const s3 = new S3();
    const file = await s3
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileName
      })
      .promise();
    const fileExt = fileName.split('.').pop()?.toLowerCase();
    if (file.Body && Buffer.isBuffer(file.Body)) {
      res.set('Content-Type', `image/${fileExt}`).send(file.Body);
    }
    throw new InternalServerErrorException(
      'Something goes wrong during getting file from AWS'
    );
  }

  async saveFile(file: Express.Multer.File, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Body: file.buffer,
        Key: fileName
      })
      .promise();
    return uploadResult.Key;
  }

  async deleteFileByName(fileName: string) {
    const s3 = new S3();
    return await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileName
      })
      .promise();
  }
}
