import { Practice } from '@prisma/client';
import { IPracticeRepository } from './repositoryInterface/IPracticeRepository';

export class deleteUseCase {
  private readonly repo: IPracticeRepository;

  public constructor(repository: IPracticeRepository) {
    this.repo = repository;
  }

  public async do(id: number): Promise<Practice> {
    return this.repo.delete(id);
  }
}
