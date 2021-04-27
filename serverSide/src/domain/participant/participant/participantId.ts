import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Entity } from '../../../shared/domain/Entity';

interface ParticipantIdProps {
  participantID: UniqueEntityID;
}

export class ParticipantId extends Entity<ParticipantIdProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): ParticipantId {
    return new ParticipantId(id);
  }
}
