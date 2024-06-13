import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Import } from '../../core/entities/import.entity';
import { ImportService } from '../services/import.service';
import { ImportController } from 'src/infrastructure/controllers/import.controller';
import { CreateImportEntryUseCase } from 'src/core/use-cases/create-import-entry.use-case';
import { UploadFileToS3UseCase } from 'src/core/use-cases/upload-file-to-s3.use-case';
import { GetImportByIdUseCase } from 'src/core/use-cases/get-import-by-id.use-case';
import { QueryImportsUseCase } from 'src/core/use-cases/query-imports.use-case';
import { ImportResolver } from 'src/infrastructure/resolvers/import.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Import])],
  providers: [
    ImportService,
    CreateImportEntryUseCase,
    UploadFileToS3UseCase,
    GetImportByIdUseCase,
    QueryImportsUseCase,
    ImportResolver,
  ],
  controllers: [ImportController],
})
export class ImportsModule {}