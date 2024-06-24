import { ApiProperty } from '@nestjs/swagger';
import { EImportType } from '../enums/import-type.enum';

export class CreateImportDto {
  @ApiProperty({ description: 'Type of import', enum: EImportType })
  type: EImportType;

  @ApiProperty({ description: 'User who created the import' })
  usrCreate: string;
}