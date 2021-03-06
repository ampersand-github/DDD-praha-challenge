import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { EnrolledStatusDTO } from './DTO/enrolledStatusDTO';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';

interface ToEnrolledStatusProps {
  participantId: string;
}

export class ToEnrolledStatusUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(props: ToEnrolledStatusProps): Promise<EnrolledStatusDTO> {
    const currentParticipant = await this.repo.findOne(props.participantId);
    const enrolled = EnrolledStatusEnum.enrolled;
    currentParticipant.changeEnrolledStatus(enrolled);
    //
    // 今後の要件によって、ここに条件を書いていく
    //
    const result = await this.repo.update(currentParticipant);
    return new EnrolledStatusDTO(result);
  }
}
