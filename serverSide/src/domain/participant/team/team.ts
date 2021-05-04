import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { TeamName } from './teamName';
import { Pair } from '../pair/pair';
import { duplicateTeamDomainService } from './duplicateTeamDomainService';

interface TeamProps {
  teamName: TeamName;
  pairs: Pair[];
  upperLimit: number;
  lowerLimit: number;
}

export class Team extends Entity<TeamProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  // staticなメソッドはconstructorでも使える
  private static participantCount(props): number {
    let count = 0;
    props.pairs.map((pair: Pair) => {
      count += pair.props.participants.length;
    });
    return count;
  }

  private constructor(props: TeamProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: TeamProps, id?: UniqueEntityID): Team {
    // todo 重複チェックのドメインサービスをつくる
    const participantCount = this.participantCount(props);

    if (participantCount < props.lowerLimit) {
      throw new Error(
        `チームに所属する参加者の人数が足りません。チームの下限は${props.lowerLimit}名です。`,
      );
    }
    // 仕様に人数上限は存在しないが、今後仕様変更があることを想定して入れる
    if (participantCount > props.upperLimit) {
      throw new Error(
        `チームに所属する参加者の人数が多すぎます。チームの上限は${props.upperLimit}名です。`,
      );
    }
    return new Team(props, id);
  }

  public participantCount(): number {
    return Team.participantCount(this.props);
  }

  private participantExist(pair: Pair): boolean {
    const _result = this.props.pairs.find((one) => one.id === pair.id);
    if (_result === undefined) {
      return false;
    }
    return true;
  }

  addPair(pair: Pair): Team {
    if (this.participantExist(pair)) {
      throw new Error('追加しようとしたペアは既にチームに所属しています。');
    }
    const data = {
      ...this.props,
      pairs: [...this.props.pairs, pair],
    };

    return Team.create(data);
  }

  removePair(pair: Pair): Team {
    if (!this.participantExist(pair)) {
      throw new Error('チームから削除したいペアが存在しません。');
    }

    // ペアから削除する
    for (let i = 0; i < this.props.pairs.length; i++) {
      if (this.props.pairs[i] === pair) {
        this.props.pairs.splice(i, 1);
      }
    }

    const data = {
      ...this.props,
      pairs: [...this.props.pairs],
    };

    return Team.create(data,this._id);
  }
}
