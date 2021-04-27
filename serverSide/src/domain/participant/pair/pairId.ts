import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Entity } from '../../../shared/domain/Entity';

interface PairIdProps {
  PairId: UniqueEntityID;
}

export class PairId extends Entity<PairIdProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): PairId {
    return new PairId(id);
  }
}
