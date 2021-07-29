import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../domain/pair/domainService/distributeOneParticipantDomainService';
import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';

export interface RemoveParticipantInPairUsecaseProps {
  pairId: string;
  removeParticipantId: string;
}
export class RemoveParticipantInPairUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly pairRepository: IPairRepository;
  private readonly service;
  public constructor(
    participantRepository: IParticipantRepository,
    pairRepository: IPairRepository,
    service: DistributeOneParticipantForAnotherPairDomainService,
  ) {
    this.participantRepository = participantRepository;
    this.pairRepository = pairRepository;
    this.service = service;
  }

  public async do(props: RemoveParticipantInPairUsecaseProps): Promise<void> {
    const participant = await this.participantRepository.findOne(props.removeParticipantId);
    const pair = await this.pairRepository.findOne(props.pairId);
    if (pair.participants.length === 2) {
      // 削除対象でないほうの参加者を別のペアに移籍する
      const target = pair.participants.find((one) => !one.equals(participant));
      await this.service.do({
        pair: pair,
        shouldBeDistributedParticipant: target,
      });
    }

    if (pair.participants.length === 3) {
      pair.removeParticipant(participant);
      await this.pairRepository.update(pair);
    }
  }
}
