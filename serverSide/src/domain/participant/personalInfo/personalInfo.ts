import { MailAddress } from './mailAddress';
import { ParticipantName } from './participantName';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export interface PersonalInfoProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
}

export class PersonalInfo extends Entity<PersonalInfoProps> {
  private constructor(props: PersonalInfoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: PersonalInfoProps,
    id?: UniqueEntityID,
  ): PersonalInfo {
    return new PersonalInfo(props, id);
  }
}
