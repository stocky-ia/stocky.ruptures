import { ApiProperty } from '@nestjs/swagger';
import { EImportType } from '../enums/import-type.enum';

export class UploadImportDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ enum: EImportType })
  type: EImportType;

  @ApiProperty()
  usrCreate: string;
}