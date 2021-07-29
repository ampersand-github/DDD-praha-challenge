import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { PairDTO } from './DTO/pairDTO';

interface FindOnePairUsecaseProps {
  pairId: string;
}
export class FindOnePairUsecase {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: FindOnePairUsecaseProps): Promise<PairDTO> {
    const result = await this.pairRepository.findOne(props.pairId);
    return new PairDTO(result);
  }
}
