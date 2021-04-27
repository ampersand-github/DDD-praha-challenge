import { Practice } from '@prisma/client';
import { IPracticeRepository } from './repositoryInterface/IPracticeRepository';

export class updateUseCase {
  private readonly repo: IPracticeRepository;

  public constructor(repository: IPracticeRepository) {
    this.repo = repository;
  }

  public async do(id: number, title: string): Promise<Practice> {
    return this.repo.update(id, title);
  }
}
