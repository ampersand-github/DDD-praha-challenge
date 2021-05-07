import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { TeamName } from './teamName';
import { Pair } from '../pair/pair';
// import { duplicateTeamDomainService } from './duplicateTeamDomainService';
// import { Participant } from '../participant/participant';

interface TeamProps {
  teamName: TeamName;
  pairs: Pair[];
  upperLimit: number;
  lowerLimit: number;
}

export class Team extends Entity<TeamProps> {
  public get pairs() {
    return this.props.pairs;
  }

  private static participantCount(pairs: TeamProps['pairs']): number {
    return pairs.reduce((prev, pair) => prev + pair.participantCount(), 0);
  }

  private static validation_lowerLimit(
    participantsCount: number,
    lowerLimit: TeamProps['lowerLimit'],
  ): void {
    if (participantsCount < lowerLimit) {
      throw new Error(
        `チームに所属する参加者の人数が足りません。チームの下限は${lowerLimit}名です。`,
      );
    }
  }

  private static validation_upperLimit(
    participantsCount: number,
    upperLimit: TeamProps['upperLimit'],
  ): void {
    if (participantsCount > upperLimit) {
      throw new Error(
        `チームに所属する参加者の人数が多すぎます。チームの上限は${upperLimit}名です。`,
      );
    }
  }

  private static validation_pairExist(
    basePair: TeamProps['pairs'],
    pair: Pair,
  ): void {
    const _result = basePair.find((one) => one.equals(pair));
    if (_result) {
      throw new Error('このペアは既にチームに存在します。');
    }
  }

  private static validation_participantNotExist(
    basePair: TeamProps['pairs'],
    pair: Pair,
  ): void {
    const _result = basePair.find((one) => one.equals(pair));
    if (!_result) {
      throw new Error('このペアはチームに存在しません。');
    }
  }

  private constructor(props: TeamProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TeamProps, id?: UniqueEntityID): Team {
    // todo 重複チェックのドメインサービスをつくる
    const participantCount = this.participantCount(props.pairs);
    this.validation_lowerLimit(participantCount, props.lowerLimit);
    // 仕様に人数上限は存在しないが、今後仕様変更があることを想定して入れる
    this.validation_upperLimit(participantCount, props.upperLimit);
    return new Team(props, id);
  }

  public participantCount(): number {
    return Team.participantCount(this.props.pairs);
  }

  public addPair(pair: Pair): void {
    Team.validation_pairExist(this.props.pairs, pair);
    this.props.pairs.push(pair);
    const participantCount = Team.participantCount(this.props.pairs);
    // 仕様に人数上限は存在しないが、今後仕様変更があることを想定して入れる
    Team.validation_upperLimit(participantCount, this.props.upperLimit);
  }

  public removePair(pair: Pair): void {
    Team.validation_participantNotExist(this.props.pairs, pair);
    // ペアから削除する
    this.props.pairs = this.props.pairs.filter((one) => !one.equals(pair));
    const participantCount = Team.participantCount(this.props.pairs);
    Team.validation_lowerLimit(participantCount, this.props.lowerLimit);
  }
}
