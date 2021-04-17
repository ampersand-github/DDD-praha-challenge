import { PracticeDataDTO } from './practiceDataDTO';
import { IGetOneRepository } from './repository/IGetOneRepository';

export class getOneUsecase {
  private readonly repo: IGetOneRepository;

  public constructor(repository: IGetOneRepository) {
    this.repo = repository;
  }

  public async do(id: number): Promise<PracticeDataDTO[]> {
    return this.repo.getOne(id);
  }
}
