import { registerEnumType } from '@nestjs/graphql';

export enum EStatus {
  WAITING = 'WAITING',
  PROCESSING = 'PROCESSING',
}

registerEnumType(EStatus, {
  name: 'EStatus',
});