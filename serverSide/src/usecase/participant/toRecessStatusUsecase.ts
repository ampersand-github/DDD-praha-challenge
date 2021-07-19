import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { EnrolledStatusDTO } from './DTO/enrolledStatusDTO';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';
import { Participant } from '../../domain/participant/participant';
import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { RemoveParticipantInPairUsecase } from '../pair/removeParticipantInPairUsecase';

interface ToRecessStatusProps {
  participantId: string;
}

export class ToRecessStatusUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly pairRepository: IPairRepository;
  private readonly removeParticipantInPairUsecase: RemoveParticipantInPairUsecase;

  public constructor(
    participantRepository: IParticipantRepository,
    pairRepository: IPairRepository,
    removeParticipantInPairUsecase: RemoveParticipantInPairUsecase,
  ) {
    this.participantRepository = participantRepository;
    this.pairRepository = pairRepository;
    this.removeParticipantInPairUsecase = removeParticipantInPairUsecase;
  }

  public async do(props: ToRecessStatusProps): Promise<EnrolledStatusDTO> {
    const currentParticipant: Participant = await this.participantRepository.findOne(
      props.participantId,
    );

    currentParticipant.changeEnrolledStatus(EnrolledStatusEnum.recess);
    const result = await this.participantRepository.update(currentParticipant);

    // ペアの削除のドメインサービス
    const targetPair = await this.pairRepository.findOneByParticipant(currentParticipant);
    await this.removeParticipantInPairUsecase.do({
      pairId: targetPair.id.toValue(),
      removeParticipant: currentParticipant,
    });

    return new EnrolledStatusDTO(result);
  }
}
