import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { PairDTO } from './DTO/pairDTO';
import { PairName } from '../../domain/pair/pairName';

interface FindOnePairUsecaseProps {
  pairName: string;
}
export class FindOnePairUsecase {
  private readonly pairRepository: IPairRepository;

  public constructor(repository: IPairRepository) {
    this.pairRepository = repository;
  }

  public async do(props: FindOnePairUsecaseProps): Promise<PairDTO> {
    const pairName = PairName.create({ pairName: props.pairName });
    const result = await this.pairRepository.findOne(pairName.pairName);
    return new PairDTO(result);
  }
}
