import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { EnrolledStatusDTO } from './DTO/enrolledStatusDTO';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';
import { Participant } from '../../domain/participant/participant';

interface ToWithdrawalStatusProps {
  participantId: string;
}

export class ToWithdrawalStatusUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(props: ToWithdrawalStatusProps): Promise<EnrolledStatusDTO> {
    const currentParticipant = await this.repo.findOne(props.participantId);
    const withdrawalData = EnrolledStatusEnum.withdrawal;
    const participant: Participant = currentParticipant.changeEnrolledStatus(withdrawalData);
    //
    // todo チーム・ペアの削除のドメインサービスをここにいれる
    //
    const result = await this.repo.updateEnrolledStatus(participant);
    return new EnrolledStatusDTO(result);
  }
}
