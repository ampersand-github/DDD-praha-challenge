import { IDeleteRepository } from './repository/IDeleteRepository';
import { Practice } from '@prisma/client';

export class deleteUseCase {
  private readonly repo: IDeleteRepository;

  public constructor(repository: IDeleteRepository) {
    this.repo = repository;
  }

  public async do(id: number): Promise<Practice> {
    return this.repo.delete(id);
  }
}
