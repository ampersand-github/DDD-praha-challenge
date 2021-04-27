import { ParticipantId } from './participantId';
import { ParticipantName } from './participantName';
import { MailAddress } from './mailAddress';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export interface ParticipantProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
}

export class Participant extends Entity<ParticipantProps> {
  get participantId(): ParticipantId {
    return ParticipantId.create(this._id);
  }

  private constructor(props: ParticipantProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ParticipantProps,
    id?: UniqueEntityID,
  ): Participant {
    return new Participant(props, id);
  }
  public getAllProperties() {
    return {
      participantName: this.props.participantName,
      mailAddress: this.props.mailAddress,
    };
  }
}
