import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Entity } from '../../../shared/domain/Entity';

interface TeamIdProps {
  TeamId: UniqueEntityID;
}

export class TeamId extends Entity<TeamIdProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): TeamId {
    return new TeamId(id);
  }
}
