import { Practice } from '@prisma/client';
import { IUpdateRepository } from './repository/IUpdateRepository';

export class updateUseCase {
  private readonly repo: IUpdateRepository;

  public constructor(repository: IUpdateRepository) {
    this.repo = repository;
  }

  public async do(id: number, title: string): Promise<Practice> {
    return this.repo.update(id, title);
  }
}
