import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { ParticipantDTO } from './DTO/participantDTO';
interface DeleteParticipantUsecaseProps {
  participantId: string;
}

export class DeleteParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(props: DeleteParticipantUsecaseProps): Promise<ParticipantDTO> {
    const currentParticipant = await this.repo.findOne(props.participantId);
    await this.repo.delete(currentParticipant);
    return new ParticipantDTO(currentParticipant);
  }
}
