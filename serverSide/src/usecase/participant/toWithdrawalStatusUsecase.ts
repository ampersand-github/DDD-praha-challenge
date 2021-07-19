import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { EnrolledStatusDTO } from './DTO/enrolledStatusDTO';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';
import { IPairRepository } from '../../domain/pair/repositoryInterface/IPairRepository';
import { RemoveParticipantInPairUsecase } from '../pair/removeParticipantInPairUsecase';

interface ToWithdrawalStatusProps {
  participantId: string;
}

export class ToWithdrawalStatusUsecase {
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

  public async do(props: ToWithdrawalStatusProps): Promise<EnrolledStatusDTO> {
    const currentParticipant = await this.participantRepository.findOne(props.participantId);
    const withdrawalData = EnrolledStatusEnum.withdrawal;
    currentParticipant.changeEnrolledStatus(withdrawalData);

    // ペアの削除のドメインサービス
    const targetPair = await this.pairRepository.findOneByParticipant(currentParticipant);
    await this.removeParticipantInPairUsecase.do({
      pairId: targetPair.id.toValue(),
      removeParticipant: currentParticipant,
    });

    const result = await this.participantRepository.update(currentParticipant);
    return new EnrolledStatusDTO(result);
  }
}
