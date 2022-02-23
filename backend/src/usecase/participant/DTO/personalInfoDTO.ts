import { Participant } from '../../../domain/participant/participant';

export class PersonalInfoDTO {
  public readonly participantName: string;
  public readonly mailAddress: string;
  public constructor(props: Participant) {
    this.participantName = props.participantName;
    this.mailAddress = props.mailAddress;
  }
}
