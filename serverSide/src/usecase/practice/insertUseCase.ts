import { IInsertRepository } from './repository/IInsertRepository';
import { Practice } from '@prisma/client';

export class insertUseCase {
  private readonly repo: IInsertRepository;

  public constructor(repository: IInsertRepository) {
    this.repo = repository;
  }

  public async do(title: string): Promise<Practice> {
    return this.repo.insert(title);
  }
}
