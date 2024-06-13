import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/commons/entity.base';
import { EImportType } from 'src/core/enums/import-type.enum';
import { EStatus } from 'src/core/enums/status.enum';

@ObjectType()
@Entity('imports')
export class Import extends BaseEntity {
  @Field(type => EStatus)
  @Column({
    type: 'enum',
    enum: EStatus,
    default: EStatus.WAITING,
  })
  status: EStatus;
  
  @Field(type => EImportType)
  @Column({ type: 'enum', enum: EImportType})
  type: EImportType;

  @Field()
  @Column()
  filekey: string;

  @Field()
  @Column()
  filename: string;

  @Field()
  @Column()
  filesize: number;

  @Field()
  @Column()
  fileExtension: string;
}