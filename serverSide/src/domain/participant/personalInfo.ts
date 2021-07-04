import { MailAddress } from './mailAddress';
import { ParticipantName } from './participantName';
import { ValueObject } from '../shared/ValueObject';

export interface PersonalInfoProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
}

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
}
