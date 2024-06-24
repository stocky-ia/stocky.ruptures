import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Import } from '../entities/import.entity';


@Injectable()
export class CreateImportEntryUseCase {
  constructor(
    @InjectRepository(Import)
    private importRepository: Repository<Import>,
  ) {}

  async execute(newImport: Partial<Import>): Promise<Import> {
    const importEntry = this.importRepository.create(newImport);
    return this.importRepository.save(importEntry);
  }
}