import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryImportsUseCase } from './query-imports.use-case';
import { Import } from '../entities/import.entity';
import { QueryImportsDto } from '../dtos/query-imports.dto';
import { EStatus } from '../enums/status.enum';


describe('QueryImportsUseCase', () => {
  let useCase: QueryImportsUseCase;
  let importRepository: Repository<Import>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryImportsUseCase,
        {
          provide: getRepositoryToken(Import),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<QueryImportsUseCase>(QueryImportsUseCase);
    importRepository = module.get<Repository<Import>>(getRepositoryToken(Import));
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a list of imports', async () => {
    const query: QueryImportsDto = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      order: 'ASC',
      status: EStatus.WAITING,
    };

    const imports = [
      new Import(),
      new Import(),
    ];

    jest.spyOn(importRepository, 'findAndCount').mockResolvedValue([imports, 2]);

    const result = await useCase.execute(query);

    expect(importRepository.findAndCount).toHaveBeenCalledWith({
      where: { status: 'WAITING' },
      take: 10,
      skip: 0,
      order: {
        createdAt: 'ASC',
      },
    });
    expect(result).toEqual(imports);
  });

  it('should apply pagination correctly', async () => {
    const query: QueryImportsDto = {
      page: 2,
      limit: 5,
      sortBy: 'createdAt',
      order: 'ASC',
      status: EStatus.WAITING,
    };

    const imports = [
      new Import(),
      new Import(),
    ];

    jest.spyOn(importRepository, 'findAndCount').mockResolvedValue([imports, 2]);

    const result = await useCase.execute(query);

    expect(importRepository.findAndCount).toHaveBeenCalledWith({
      where: { status: 'WAITING' },
      take: 5,
      skip: 5,
      order: {
        createdAt: 'ASC',
      },
    });
    expect(result).toEqual(imports);
  });

  it('should apply sorting correctly', async () => {
    const query: QueryImportsDto = {
      page: 1,
      limit: 10,
      sortBy: 'filename',
      order: 'DESC',
      status: EStatus.WAITING
    };

    const imports = [
      new Import(),
      new Import(),
    ];

    jest.spyOn(importRepository, 'findAndCount').mockResolvedValue([imports, 2]);

    const result = await useCase.execute(query);

    expect(importRepository.findAndCount).toHaveBeenCalledWith({
      where: { status: 'WAITING' },
      take: 10,
      skip: 0,
      order: {
        filename: 'DESC',
      },
    });
    expect(result).toEqual(imports);
  });
});