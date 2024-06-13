import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class UploadFileToS3UseCase {
  async execute(file: Express.Multer.File): Promise<string> {
    const s3 = new S3Client({ region: 'your-region' });
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: 'your-bucket-name',
      Key: fileKey,
      Body: fs.createReadStream(file.path),
    };

    await s3.send(new PutObjectCommand(params));
    return fileKey;
  }
}