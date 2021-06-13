import { IParticipantRepository } from '../../domain/participant/repositoryInterface/IParticipantRepository';
import { ParticipantDTO } from './DTO/participantDTO';
import { ParticipantFactory } from '../../domain/participant/service/participantFactory';
import { Participant } from '../../domain/participant/participant';

interface FactoryProps {
  participantName: string;
  mailAddress: string;
}

export class CreateParticipantUsecase {
  private readonly participantRepository: IParticipantRepository;
  private readonly participantFactory: ParticipantFactory;

  public constructor(repository: IParticipantRepository, factory: ParticipantFactory) {
    this.participantRepository = repository;
    this.participantFactory = factory;
  }

  public async do(props: FactoryProps): Promise<ParticipantDTO> {
    const newParticipant: Participant = await this.participantFactory.factory(props);
    const result = await this.participantRepository.create(newParticipant);
    return new ParticipantDTO(result);
  }
}
