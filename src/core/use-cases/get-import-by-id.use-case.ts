import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Import } from 'src/core/entities/import.entity';

@Injectable()
export class GetImportByIdUseCase {
  constructor(
    @InjectRepository(Import)
    private importRepository: Repository<Import>,
  ) {}

  async execute(id: string): Promise<Import> {
    const importEntry = await this.importRepository.findOne({
      where: { id: new ObjectId(id) }
    });
    
    if (!importEntry) {
      throw new NotFoundException('Import not found');
    }
    return importEntry;
  }
}