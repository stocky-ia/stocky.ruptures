import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EStatus } from '../enums/status.enum';
import { EImportType } from '../enums/import-type.enum';
import { CreateImportEntryUseCase } from './create-import-entry.use-case';
import { Import } from '../entities/import.entity';

describe('CreateImportEntryUseCase', () => {
  let useCase: CreateImportEntryUseCase;
  let importRepository: Repository<Import>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateImportEntryUseCase,
        {
          provide: getRepositoryToken(Import),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<CreateImportEntryUseCase>(CreateImportEntryUseCase);
    importRepository = module.get<Repository<Import>>(getRepositoryToken(Import));
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create and save a new import entry', async () => {
    const newImport = {
      status: EStatus.WAITING,
      type:  EImportType.SELLER,
      filename: 'test.csv',
      filesize: 123,
      fileExtension: 'text/csv',
      usrCreate: 'testUser',
      usrUpdate: 'testUser',
    };

    jest.spyOn(importRepository, 'create').mockReturnValue(newImport as any);
    jest.spyOn(importRepository, 'save').mockResolvedValue(newImport as any);

    const result = await useCase.execute(newImport);

    expect(importRepository.create).toHaveBeenCalledWith(newImport);
    expect(importRepository.save).toHaveBeenCalledWith(newImport);
    expect(result).toEqual(newImport);
  });
});