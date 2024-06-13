import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Import } from 'src/core/entities/import.entity';
import { QueryImportsDto } from 'src/core/dtos/query-imports.dto';

@Injectable()
export class QueryImportsUseCase {
  constructor(
    @InjectRepository(Import)
    private importRepository: Repository<Import>,
  ) {}

  async execute(query: QueryImportsDto): Promise<Import[]> {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'ASC', ...filters } = query;

    const [results, total] = await this.importRepository.findAndCount({
      where: filters,
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: order,
      },
    });

    return results;
  }
}