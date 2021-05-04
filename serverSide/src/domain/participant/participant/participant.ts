import { ParticipantName } from './participantName';
import { MailAddress } from './mailAddress';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { EnrolledStatus } from './enrolledStatus';

export interface ParticipantProps {
  participantName: ParticipantName;
  mailAddress: MailAddress;
  enrolledStatus: EnrolledStatus;
}

export class Participant extends Entity<ParticipantProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  // todo メールアドレス型を返すべきか、メールアドレスそのもの(string)を返すべきか
/*
  public get mailAddress() {
    return this.props.mailAddress.mailAddress;
  }
 */

  public get mailAddress():ParticipantProps["mailAddress"] {
    return this.props.mailAddress;
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
}
