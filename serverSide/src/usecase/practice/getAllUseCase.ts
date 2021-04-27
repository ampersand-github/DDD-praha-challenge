import { PracticeDataDTO } from './dto/practiceDataDTO';
import { IPracticeRepository } from './repositoryInterface/IPracticeRepository';

export class getAllUsecase {
  private readonly repo: IPracticeRepository;

  public constructor(repository: IPracticeRepository) {
    this.repo = repository;
  }

  public async do(): Promise<PracticeDataDTO[]> {
    return this.repo.getAll();
  }
}
