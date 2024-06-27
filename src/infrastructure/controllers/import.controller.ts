import { Controller, Post, UploadedFile, UseInterceptors, Body, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ImportService } from '../services/import.service';
import { UploadImportDto } from '../../core/dtos/upload-import.dto';
import { CreateImportDto } from '../../core/dtos/create-import.dto';

@ApiTags('import')
@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get('health')
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

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