import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ImportResolver } from './import.resolver';
import { GetImportByIdUseCase } from '../../core/use-cases/get-import-by-id.use-case';
import { QueryImportsUseCase } from '../../core/use-cases/query-imports.use-case';
import { Import } from '../../core/entities/import.entity';
import { QueryImportsDto } from '../../core/dtos/query-imports.dto';
import { EStatus } from '../../core/enums/status.enum';

describe('ImportResolver', () => {
  let resolver: ImportResolver;
  let getImportByIdUseCase: GetImportByIdUseCase;
  let queryImportsUseCase: QueryImportsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportResolver,
        {
          provide: GetImportByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryImportsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ImportResolver>(ImportResolver);
    getImportByIdUseCase = module.get<GetImportByIdUseCase>(GetImportByIdUseCase);
    queryImportsUseCase = module.get<QueryImportsUseCase>(QueryImportsUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getImportById', () => {
    it('should return an import entry if found', async () => {
      const id = '60d5f9c2f9b1b034d8b5c4b1';
      const importEntry = new Import();
      jest.spyOn(getImportByIdUseCase, 'execute').mockResolvedValue(importEntry);

      const result = await resolver.getImportById(id);

      expect(getImportByIdUseCase.execute).toHaveBeenCalledWith(id);
      expect(result).toEqual(importEntry);
    });

    it('should throw NotFoundException if import entry is not found', async () => {
      const id = '60d5f9c2f9b1b034d8b5c4b1';
      jest.spyOn(getImportByIdUseCase, 'execute').mockRejectedValue(new NotFoundException());

      await expect(resolver.getImportById(id)).rejects.toThrow(NotFoundException);
      expect(getImportByIdUseCase.execute).toHaveBeenCalledWith(id);
    });
  });

  describe('queryImports', () => {
    it('should return a list of imports', async () => {
      const query: QueryImportsDto = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'ASC',
        status: EStatus.WAITING,
      };

      const imports = [new Import(), new Import()];
      jest.spyOn(queryImportsUseCase, 'execute').mockResolvedValue(imports);

      const result = await resolver.queryImports(query);

      expect(queryImportsUseCase.execute).toHaveBeenCalledWith(query);
      expect(result).toEqual(imports);
    });
  });
});