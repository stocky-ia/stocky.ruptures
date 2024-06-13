import { Injectable } from '@nestjs/common';
import { CreateImportEntryUseCase } from 'src/core/use-cases/create-import-entry.use-case';
import { UploadFileToS3UseCase } from 'src/core/use-cases/upload-file-to-s3.use-case';
import { Import } from 'src/core/entities/import.entity';
import { CreateImportDto } from 'src/core/dtos/create-import.dto';
import { EStatus } from 'src/core/enums/status.enum';

@Injectable()
export class ImportService {
  constructor(
    private readonly createImportEntryUseCase: CreateImportEntryUseCase,
    private readonly uploadFileToS3UseCase: UploadFileToS3UseCase,
  ) {}

  async handleImport(file: Express.Multer.File, createImportDto: CreateImportDto): Promise<Import> {
    const fileKey =  "key-aws-s3-default";//await this.uploadFileToS3UseCase.execute(file);

    const newImport = {
      status: EStatus.WAITING,
      type: createImportDto.type,
      filekey: fileKey,
      filename: file.originalname,
      filesize: file.size,
      fileExtension: file.mimetype,
      usrCreate: createImportDto.usrCreate,
      usrUpdate: createImportDto.usrCreate,
    };

    return this.createImportEntryUseCase.execute(newImport);
  }
}