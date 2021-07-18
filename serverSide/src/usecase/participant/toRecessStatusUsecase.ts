import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { EnrolledStatusDTO } from './DTO/enrolledStatusDTO';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';
import { Participant } from '../../domain/participant/participant';

interface ToRecessStatusProps {
  participantId: string;
}

export class ToRecessStatusUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(props: ToRecessStatusProps): Promise<EnrolledStatusDTO> {
    const currentParticipant: Participant = await this.repo.findOne(props.participantId);
    currentParticipant.changeEnrolledStatus(EnrolledStatusEnum.recess);
    //
    // todo [高] ペアの削除のドメインサービスをここにいれる
    //
    const result = await this.repo.update(currentParticipant);
    return new EnrolledStatusDTO(result);
  }
}
