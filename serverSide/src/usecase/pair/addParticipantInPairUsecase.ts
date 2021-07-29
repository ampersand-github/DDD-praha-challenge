import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { PairDTO } from './DTO/pairDTO';
import { DisallowDuplicateParticipantInTPairDomainService } from '../../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { DividePairDomainService } from '../../domain/pair/domainService/dividePairDomainService';
import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';

interface AddParticipantInPairUsecaseProps {
  pairId: string;
  addParticipantId: string;
}

export class AddParticipantInPairUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly pairRepository: IPairRepository;
  private readonly addService;
  private readonly divideService;
  public constructor(
    participantRepository: IParticipantRepository,
    pairRepository: IPairRepository,
    addService: DisallowDuplicateParticipantInTPairDomainService,
    divideService: DividePairDomainService,
  ) {
    this.participantRepository = participantRepository;
    this.pairRepository = pairRepository;
    this.addService = addService;
    this.divideService = divideService;
  }

  public async do(props: AddParticipantInPairUsecaseProps): Promise<PairDTO[]> {
    const pair = await this.pairRepository.findOne(props.pairId);
    const participant = await this.participantRepository.findOne(props.addParticipantId);
    if (pair.participants.length === 2) {
      // ペアに参加者を追加
      this.addService.do({ participant: participant });
      pair.addParticipant(participant);
      //
      const result = await this.pairRepository.update(pair);
      return [new PairDTO(result)];
    }
    if (pair.participants.length === 3) {
      const result = await this.divideService.do({
        pair: pair,
        addParticipant: participant,
      });
      return result.map((pair) => {
        return new PairDTO(pair);
      });
    }
  }
}
