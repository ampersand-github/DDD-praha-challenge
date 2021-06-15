import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { PersonalInfoDTO } from './DTO/personalInfoDTO';
import { PersonalInfo } from '../../domain/participant/personalInfo';

export class FindAllParticipantUsecase {
  private readonly repo: IParticipantRepository;

  public constructor(repository: IParticipantRepository) {
    this.repo = repository;
  }

  public async do(): Promise<PersonalInfoDTO[]> {
    const ParticipantList = await this.repo.findAll();
    return ParticipantList.map((one: PersonalInfo) => {
      return new PersonalInfoDTO(one);
    });
  }
}
