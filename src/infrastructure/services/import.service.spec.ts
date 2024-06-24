import { Test, TestingModule } from '@nestjs/testing';
import { ImportService } from './import.service';
import { CreateImportEntryUseCase } from '../../core/use-cases/create-import-entry.use-case';
import { UploadFileToS3UseCase } from '../../core/use-cases/upload-file-to-s3.use-case';
import { Import } from '../../core/entities/import.entity';
import { CreateImportDto } from '../../core/dtos/create-import.dto';
import { EStatus } from '../../core/enums/status.enum';
import { EImportType } from '../../core/enums/import-type.enum';

describe('ImportService', () => {
  let service: ImportService;
  let createImportEntryUseCase: CreateImportEntryUseCase;
  let uploadFileToS3UseCase: UploadFileToS3UseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportService,
        {
          provide: CreateImportEntryUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UploadFileToS3UseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImportService>(ImportService);
    createImportEntryUseCase = module.get<CreateImportEntryUseCase>(CreateImportEntryUseCase);
    uploadFileToS3UseCase = module.get<UploadFileToS3UseCase>(UploadFileToS3UseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle import correctly', async () => {
    const file = {
      originalname: 'test.csv',
      size: 1234,
      mimetype: 'text/csv',
    } as Express.Multer.File;

    const createImportDto: CreateImportDto = {
      type: EImportType.SELLER,
      usrCreate: 'testUser',
    };

    const importEntity = new Import();
  
    jest.spyOn(createImportEntryUseCase, 'execute').mockResolvedValue(importEntity);

    const result = await service.handleImport(file, createImportDto);

    expect(createImportEntryUseCase.execute).toHaveBeenCalledWith({
      status: EStatus.WAITING,
      type: createImportDto.type,
      fileKey: undefined,
      filename: file.originalname,
      filesize: file.size,
      fileExtension: file.mimetype,
      usrCreate: createImportDto.usrCreate,
      usrUpdate: createImportDto.usrCreate,
    });
    expect(result).toEqual(importEntity);
  });
});