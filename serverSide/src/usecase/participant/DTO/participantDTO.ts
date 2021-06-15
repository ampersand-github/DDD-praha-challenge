import { Participant } from '../../../domain/participant/participant';
import { PersonalInfoDTO } from './personalInfoDTO';
import { ParticipantHavingTasksDTO } from './participantHavingTasksDTO';

export class ParticipantDTO {
  public readonly personalInfoDTO: PersonalInfoDTO;
  public readonly enrolledStatus: string;
  public readonly participantHavingTasksDTO: ParticipantHavingTasksDTO;
  public constructor(props: Participant) {
    this.personalInfoDTO = new PersonalInfoDTO(props.personalInfo);
    this.enrolledStatus = props.enrolledStatus;
    this.participantHavingTasksDTO = new ParticipantHavingTasksDTO(props.participantHavingTasks);
  }
}
