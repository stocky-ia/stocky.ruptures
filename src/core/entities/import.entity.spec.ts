import { EImportType } from "../enums/import-type.enum";
import { EStatus } from "../enums/status.enum";
import { Import } from "./import.entity";


describe('Import Entity', () => {
  it('should create an import entity', () => {
    const importEntity = new Import();
    importEntity.status = EStatus.WAITING;
    importEntity.type = EImportType.SELLER;
    importEntity.filename = 'test.csv';
    importEntity.filesize = 1234;
    importEntity.fileExtension = 'csv';

    expect(importEntity.status).toBe(EStatus.WAITING);
    expect(importEntity.type).toBe(EImportType.SELLER);
    expect(importEntity.filename).toBe('test.csv');
    expect(importEntity.filesize).toBe(1234);
    expect(importEntity.fileExtension).toBe('csv');
  });
});