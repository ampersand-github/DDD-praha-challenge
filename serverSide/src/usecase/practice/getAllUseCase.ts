import { PracticeDataDTO } from './practiceDataDTO';
import { IGetAllRepository } from './repository/IGetAllRepository';

export class getAllUsecase {
  private readonly repo: IGetAllRepository;

  public constructor(repository: IGetAllRepository) {
    this.repo = repository;
  }

  public async do(): Promise<PracticeDataDTO[]> {
    return this.repo.getAll();
  }
  // todo 疑問 crudユースケースをここにまとめてはいけないのか？
}
