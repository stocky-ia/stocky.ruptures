import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';
import { GetImportByIdUseCase } from './get-import-by-id.use-case';
import { Import } from '../entities/import.entity';

describe('GetImportByIdUseCase', () => {
  let useCase: GetImportByIdUseCase;
  let importRepository: Repository<Import>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetImportByIdUseCase,
        {
          provide: getRepositoryToken(Import),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<GetImportByIdUseCase>(GetImportByIdUseCase);
    importRepository = module.get<Repository<Import>>(getRepositoryToken(Import));
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an import entry if found', async () => {
    const id = '60d5f9c2f9b1b034d8b5c4b1';
    const importEntry = new Import();
    importEntry.id = new ObjectId(id);
    jest.spyOn(importRepository, 'findOne').mockResolvedValue(importEntry);

    const result = await useCase.execute(id);

    expect(importRepository.findOne).toHaveBeenCalledWith({
      where: { id: new ObjectId(id) },
    });
    expect(result).toEqual(importEntry);
  });

  it('should throw NotFoundException if import entry is not found', async () => {
    const id = '60d5f9c2f9b1b034d8b5c4b1';
    jest.spyOn(importRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(id)).rejects.toThrow(NotFoundException);
    expect(importRepository.findOne).toHaveBeenCalledWith({
      where: { id: new ObjectId(id) },
    });
  });
});