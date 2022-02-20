import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { PersonalInfoDTO } from './DTO/personalInfoDTO';
import { Participant } from '../../domain/participant/participant';

export class FindAllParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(): Promise<PersonalInfoDTO[]> {
    const ParticipantList = await this.repo.findAll();
    return ParticipantList.map((one: Participant) => {
      return new PersonalInfoDTO(one);
    });
  }
}
