import { UniqueEntityID } from '../shared/UniqueEntityID';
import { Participant } from '../participant/participant';
import { Entity } from '../shared/Entity';
import { PairName } from './pairName';

interface PairProps {
  pairName: PairName;
  participants: Participant[];
}

export class Pair extends Entity<PairProps> {
  private static upperLimit = 3;
  private static lowerLimit = 2;

  public get pairName(): string {
    return this.props.pairName.pairName;
  }
  public get participants(): Participant[] {
    return this.props.participants;
  }
  private static validation_lowerLimit(participantsCount: number): void {
    if (participantsCount < this.lowerLimit) {
      throw new Error(
        `ペアに所属する参加者の人数が足りません。ペアの下限は${this.lowerLimit}名です。`,
      );
    }
  }

  private static validation_upperLimit(participantsCount: number): void {
    if (participantsCount > this.upperLimit) {
      throw new Error(
        `ペアに所属する参加者の人数が多すぎます。ペアの上限は${this.upperLimit}名です。`,
      );
    }
  }

  private static validation_participantExist(
    baseParticipants: PairProps['participants'],
    participant: Participant,
  ): void {
    const _result = baseParticipants.find((one) => one.equals(participant));
    if (_result) {
      throw new Error('この参加者は既にペアに所属しています。');
    }
  }

  private static validation_participantNotExist(
    baseParticipants: PairProps['participants'],
    participant: Participant,
  ): void {
    const _result = baseParticipants.find((one) => one.equals(participant));
    if (!_result) {
      throw new Error('この参加者は存在しません。');
    }
  }

  private constructor(props: PairProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PairProps, id?: UniqueEntityID): Pair {
    Pair.validation_lowerLimit(props.participants.length);
    Pair.validation_upperLimit(props.participants.length);
    return new Pair(props, id);
  }

  public addParticipant(participant: Participant): void {
    Pair.validation_participantExist(this.props.participants, participant);
    this.props.participants.push(participant);
    Pair.validation_upperLimit(this.props.participants.length);
  }

  public removeParticipant(participant: Participant): void {
    Pair.validation_participantNotExist(this.props.participants, participant);
    this.props.participants = this.props.participants.filter((one) => !one.equals(participant));
    Pair.validation_lowerLimit(this.props.participants.length);
  }

  public participantCount(): number {
    return this.props.participants.length;
  }
}
