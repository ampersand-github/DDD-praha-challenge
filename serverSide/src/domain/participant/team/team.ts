import { Entity } from '../../../shared/domain/Entity';
import { TeamId } from './teamId';
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
  get id(): TeamId {
    return TeamId.create(this._id);
  }

  private constructor(props: TeamProps, id?: UniqueEntityID) {
    super(props, id);
  }
  static create(props: TeamProps, id?: UniqueEntityID): Team {
    // todo 重複チェックのドメインサービスをつくる
    //
    let participantCount = 0;
    props.pairs.map((pair:Pair)=>{
      participantCount += pair.props.participants.length
    })
    console.log(`このチームの参加者は${participantCount}人です`)
    if (participantCount < props.lowerLimit) {
      throw new Error(
        `チームに所属する参加者の人数が足りません。チームの下限は${props.lowerLimit}名です。`,
      );
    }

    if (props.pairs.length > props.upperLimit) {
      throw new Error(
        `チームに所属する参加者の人数が多すぎます。チームの上限は${props.upperLimit}名です。`,
      );
    }
    return new Team(props, id);
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
