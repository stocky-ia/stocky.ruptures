import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { EStatus } from '../enums/status.enum';
import { EImportType } from '../enums/import-type.enum';


@InputType()
export class QueryImportsDto {
  @ApiProperty({ description: 'Status of the import', enum: EStatus, required: false })
  @Field(type => EStatus, { nullable: true })
  status?: EStatus;

  @ApiProperty({ description: 'Type of the import', enum: EImportType, required: false })
  @Field(type => EImportType, { nullable: true })
  type?: EImportType;

  @ApiProperty({ description: 'Filename of the import', required: false })
  @Field({ nullable: true })
  filename?: string;

  @ApiProperty({ description: 'User who created the import', required: false })
  @Field({ nullable: true })
  usrCreate?: string;

  @ApiProperty({ description: 'Page number for pagination', required: false })
  @Field({ nullable: true })
  page?: number;

  @ApiProperty({ description: 'Limit of items per page', required: false })
  @Field({ nullable: true })
  limit?: number;

  @ApiProperty({ description: 'Field to sort by', required: false })
  @Field({ nullable: true })
  sortBy?: string;

  @ApiProperty({ description: 'Order of sorting', required: false, enum: ['ASC', 'DESC'] })
  @Field({ nullable: true })
  order?: 'ASC' | 'DESC';
}