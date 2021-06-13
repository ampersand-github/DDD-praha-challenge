import { PersonalInfo } from '../../../domain/participant/personalInfo';

export class PersonalInfoDTO {
  public readonly participantName: string;
  public readonly mailAddress: string;
  public constructor(props: PersonalInfo) {
    this.participantName = props.participantName;
    this.mailAddress = props.mailAddress;
  }
}
