import { MailAddress } from './mailAddress';
import { ParticipantName } from './participantName';
import { Entity } from '../shared/Entity';
import { UniqueEntityID } from '../shared/UniqueEntityID';

export interface PersonalInfoProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
}

export class PersonalInfo extends Entity<PersonalInfoProps> {
  public get participantName() {
    return this.props.participantName.participantName;
  }
  public get mailAddress() {
    return this.props.mailAddress.mailAddress;
  }

  private constructor(props: PersonalInfoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PersonalInfoProps, id?: UniqueEntityID): PersonalInfo {
    return new PersonalInfo(props, id);
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
