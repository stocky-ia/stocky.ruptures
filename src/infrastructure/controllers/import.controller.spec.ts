import { Test, TestingModule } from '@nestjs/testing';
import { ImportController } from './import.controller';
import { ImportService } from '../services/import.service';
import { CreateImportDto } from '../../core/dtos/create-import.dto';
import { EImportType } from '../../core/enums/import-type.enum';
import { Import } from '../../core/entities/import.entity';


describe('ImportController', () => {
  let controller: ImportController;
  let service: ImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        {
          provide: ImportService,
          useValue: {
            handleImport: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImportController>(ImportController);
    service = module.get<ImportService>(ImportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle file upload', async () => {
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
    jest.spyOn(service, 'handleImport').mockResolvedValue(importEntity);

    const result = await controller.uploadFile(file, createImportDto);

    expect(service.handleImport).toHaveBeenCalledWith(file, createImportDto);
    expect(result).toEqual(importEntity);
  });
});