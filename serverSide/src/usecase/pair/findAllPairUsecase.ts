import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { Pair } from '../../domain/pair/pair';
import { PairDTO } from './DTO/pairDTO';

export class FindAllPairUsecase {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(): Promise<PairDTO[]> {
    const result = await this.pairRepository.findAll();
    return result.map((one: Pair) => new PairDTO(one));
  }
}
