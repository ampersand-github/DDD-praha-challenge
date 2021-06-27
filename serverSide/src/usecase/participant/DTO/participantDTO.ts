import { Participant } from '../../../domain/participant/participant';
import { PersonalInfoDTO } from './personalInfoDTO';
import { ParticipantHavingTaskCollectionDTO } from './participantHavingTasksDTO';

export class ParticipantDTO {
  public readonly personalInfoDTO: PersonalInfoDTO;
  public readonly enrolledStatus: string;
  public readonly participantHavingTasksDTO: ParticipantHavingTaskCollectionDTO;
  public constructor(props: Participant) {
    this.personalInfoDTO = new PersonalInfoDTO(props);
    this.enrolledStatus = props.enrolledStatus;
    this.participantHavingTasksDTO = new ParticipantHavingTaskCollectionDTO(props);
  }
}
