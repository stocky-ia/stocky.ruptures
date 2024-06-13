import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetImportByIdUseCase } from 'src/core/use-cases/get-import-by-id.use-case';
import { QueryImportsUseCase } from 'src/core/use-cases/query-imports.use-case';
import { Import } from 'src/core/entities/import.entity';
import { QueryImportsDto } from 'src/core/dtos/query-imports.dto';

@Resolver(of => Import)
export class ImportResolver {
  constructor(
    private readonly getImportByIdUseCase: GetImportByIdUseCase,
    private readonly queryImportsUseCase: QueryImportsUseCase,
  ) {}

  @Query(returns => Import)
  async getImportById(@Args('id') id: string): Promise<Import> {
    return this.getImportByIdUseCase.execute(id);
  }

  @Query(returns => [Import])
  async queryImports(@Args('query') query: QueryImportsDto): Promise<Import[]> {
    return this.queryImportsUseCase.execute(query);
  }
}