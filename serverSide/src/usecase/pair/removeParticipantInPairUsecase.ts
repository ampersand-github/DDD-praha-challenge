import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { Participant } from '../../domain/participant/participant';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../domain/pair/domainService/distributeOneParticipantDomainService';

interface RemoveParticipantInPairUsecaseProps {
  pairId: string;
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
    const pair = await this.pairRepository.findOne(props.pairId);
    if (pair.participants.length === 2) {
      // 削除対象でないほうの参加者を別のペアに移籍する
      const target = pair.participants.find((one) => !one.equals(props.removeParticipant));
      await this.service.do({
        pair: pair,
        shouldBeDistributedParticipant: target,
      });
    }

    if (pair.participants.length === 3) {
      pair.removeParticipant(props.removeParticipant);
      await this.pairRepository.update(pair);
    }
  }
}
