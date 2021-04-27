import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Participant } from '../participant/participant';
import { Entity } from '../../../shared/domain/Entity';
import { PairId } from './pairId';
import { PairName } from './pairName';

interface PairProps {
  pairName: PairName;
  participants: Participant[];
  upperLimit: number;
  lowerLimit: number;
}

export class Pair extends Entity<PairProps> {
  get pairId(): PairId {
    return PairId.create(this._id);
  }

  private constructor(props: PairProps, id?: UniqueEntityID) {
    super(props, id);
  }
  static create(props: PairProps, id?: UniqueEntityID): Pair {
    if (props.participants.length < props.lowerLimit) {
      throw new Error(`ペアに所属する参加者の人数が足りません。ペアの下限は${props.lowerLimit}名です。`);
    }

    if (props.participants.length > props.upperLimit) {
      throw new Error(`ペアに所属する参加者の人数が多すぎます。ペアの上限は${props.upperLimit}名です。`);
    }
    return new Pair(props, id);
  }

  canAdd() :boolean {
    // todo ロジックを書く
    return true
  }
  canRemove() :boolean {
    // todo ロジックを書く
    return true
  }
  addParticipant(): Pair {
    // todo ロジックを書く
    return Pair.create(this.props)
  }
  removeParticipant(): Pair {
    // todo ロジックを書く
    return Pair.create(this.props)
  }
}
