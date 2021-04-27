import { PracticeDataDTO } from './dto/practiceDataDTO';
import { IPracticeRepository } from './repositoryInterface/IPracticeRepository';

export class getOneUsecase {
  private readonly repo: IPracticeRepository;

  public constructor(repository: IPracticeRepository) {
    this.repo = repository;
  }

  public async do(id: number): Promise<PracticeDataDTO[]> {
    return this.repo.getOne(id);
  }
}
