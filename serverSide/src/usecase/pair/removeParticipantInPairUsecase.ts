import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { Participant } from '../../domain/participant/participant';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../domain/pair/domainService/distributeOneParticipantDomainService';

interface RemoveParticipantInPairUsecaseProps {
  pairName: string;
  removeParticipant: Participant;
}
export class RemoveParticipantInPairUsecase {
  private readonly pairRepository: IPairRepository;
  private readonly service;
  public constructor(
    repository: IPairRepository,
    service: DistributeOneParticipantForAnotherPairDomainService,
  ) {
    this.pairRepository = repository;
    this.service = service;
  }

  public async do(props: RemoveParticipantInPairUsecaseProps): Promise<void> {
    const pair = await this.pairRepository.findOne(props.pairName);
    if (pair.participants.length === 2) {
      this.service.do({ pair: pair, shouldBeDistributedParticipant: props.removeParticipant });
    }
    if (pair.participants.length === 3) {
      const removedPair = pair.removeParticipant(props.removeParticipant);
      await this.pairRepository.update(removedPair);
    }
  }
}
