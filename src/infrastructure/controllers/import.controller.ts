import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportService } from 'src/infrastructure/services/import.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateImportDto } from 'src/core/dtos/create-import.dto';
import { UploadImportDto } from 'src/core/dtos/upload-import.dto';

@ApiTags('import')
@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a CSV file' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiBody({ description: 'Upload a CSV file', type: UploadImportDto })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImportDto: CreateImportDto,
  ) {
    return this.importService.handleImport(file, createImportDto);
  }
}