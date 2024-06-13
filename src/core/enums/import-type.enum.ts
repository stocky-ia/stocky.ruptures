import { registerEnumType } from '@nestjs/graphql';

export enum EImportType {
  SELLER = 'SELLER',
  PRODUCT = 'PRODUCT',
  STOCK = 'STOCK',
  ORDER = 'ORDER'
}

registerEnumType(EImportType, {
  name: 'EImportType',
});