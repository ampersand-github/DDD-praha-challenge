import { IParticipantRepository } from '../../../domain/participant/repositoryInterface/IParticipantRepository';
import { ParticipantDTO } from './dto/participantDataDTO';

export class GetAllParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(): Promise<ParticipantDTO[]> {
    return this.repo.getAllParticipant();
  }
}
