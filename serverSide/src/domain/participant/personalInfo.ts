import { MailAddress } from './mailAddress';
import { ParticipantName } from './participantName';
import { ValueObject } from '../shared/ValueObject';

export interface PersonalInfoProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
}

// todo これってエンティティにすべき？　検討
export class PersonalInfo extends ValueObject<PersonalInfoProps> {
  public get participantName() {
    return this.props.participantName.participantName;
  }
  public get mailAddress() {
    return this.props.mailAddress.mailAddress;
  }

  private constructor(props: PersonalInfoProps) {
    super(props);
  }

  public static create(props: PersonalInfoProps): PersonalInfo {
    return new PersonalInfo(props);
  }

  public changeMailAddress(mailAddress: string): PersonalInfo {
    this.props.mailAddress = this.props.mailAddress.changeMailAddress(mailAddress);
    return this;
  }
  public changeParticipantName(participantName: string): PersonalInfo {
    this.props.participantName = this.props.participantName.changeParticipantName(participantName);
    return this;
  }
}
