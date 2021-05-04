import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Participant } from '../participant/participant';
import { Entity } from '../../../shared/domain/Entity';
import { PairName } from './pairName';
import {create} from "domain";

interface PairProps {
  pairName: PairName;
  participants: Participant[];
  upperLimit: number;
  lowerLimit: number;
}

export class Pair extends Entity<PairProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(props: PairProps, id?: UniqueEntityID) {
    super(props, id);
  }
  static create(props: PairProps, id?: UniqueEntityID): Pair {
    if (props.participants.length < props.lowerLimit) {
      throw new Error(
        `ペアに所属する参加者の人数が足りません。ペアの下限は${props.lowerLimit}名です。`,
      );
    }

    if (props.participants.length > props.upperLimit) {
      throw new Error(
        `ペアに所属する参加者の人数が多すぎます。ペアの上限は${props.upperLimit}名です。`,
      );
    }
    return new Pair(props, id);
  }

  private participantExist(participant: Participant): boolean {
    const _result = this.props.participants.find(
      (one) => one.id === participant.id,
    );
    return _result === undefined ? false : true;
  }

  addParticipant(participant: Participant): Pair {
    if (this.participantExist(participant)) {
      throw new Error('追加しようとした参加者は既にペアに所属しています。');
    }
    const data = {
      ...this.props,
      participants: [...this.props.participants, participant],
    };

    return Pair.create(data);
  }
  removeParticipant(participant: Participant): Pair {
    if (!this.participantExist(participant)) {
      throw new Error('ペアから追放したい参加者が存在しません。');
    }

    // ペアから削除する
    for (let i = 0; i < this.props.participants.length; i++) {
      if (this.props.participants[i] === participant) {
        this.props.participants.splice(i, 1);
      }
    }

    const data = {
      ...this.props,
      participants: [...this.props.participants],
    };
    return Pair.create(data);
  }
}
