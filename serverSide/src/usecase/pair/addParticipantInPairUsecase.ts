import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { PairDTO } from './DTO/pairDTO';
import { Participant } from '../../domain/participant/participant';
import { DisallowDuplicateParticipantInTPairDomainService } from '../../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { DividePairDomainService } from '../../domain/pair/domainService/dividePairDomainService';

interface AddParticipantInPairUsecaseProps {
  pairName: string;
  addParticipant: Participant;
}

export class AddParticipantInPairUsecase {
  private readonly pairRepository: IPairRepository;
  private readonly addService;
  private readonly divideService;
  public constructor(
    repository: IPairRepository,
    addService: DisallowDuplicateParticipantInTPairDomainService,
    divideService: DividePairDomainService,
  ) {
    this.pairRepository = repository;
    this.addService = addService;
    this.divideService = divideService;
  }

  public async do(props: AddParticipantInPairUsecaseProps): Promise<PairDTO[]> {
    const pair = await this.pairRepository.findOne(props.pairName);
    if (pair.participants.length === 2) {
      // ペアに参加者を追加
      this.addService.do({ participant: props.addParticipant });
      const addedPair = pair.addParticipant(props.addParticipant);
      //
      const result = await this.pairRepository.update(addedPair);
      return [new PairDTO(result)];
    }
    if (pair.participants.length === 3) {
      const result = await this.divideService.do({
        pair: pair,
        addParticipant: props.addParticipant,
      });
      return result.map((pair) => {
        return new PairDTO(pair);
      });
    }
  }
}
