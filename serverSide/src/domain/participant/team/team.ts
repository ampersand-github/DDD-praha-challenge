import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { TeamName } from './teamName';
import { Pair } from '../pair/pair';

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
  static participantCount(props): number {
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

  canAdd(): boolean {
    // todo ロジックを書く
    return true;
  }
  canRemove(): boolean {
    // todo ロジックを書く
    return true;
  }
  addPair(): Team {
    // todo ロジックを書く
    return Team.create(this.props);
  }
  removePair(): Team {
    // todo ロジックを書く
    return Team.create(this.props);
  }
}
