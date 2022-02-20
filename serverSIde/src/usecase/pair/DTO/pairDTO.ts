import { Pair } from '../../../domain/pair/pair';
import { ParticipantDTO } from '../../participant/DTO/participantDTO';

export class PairDTO {
  public readonly pairName: string;
  public readonly participants: ParticipantDTO[];
  public constructor(pair: Pair) {
    this.pairName = pair.pairName;
    this.participants = pair.participants.map((one) => {
      return new ParticipantDTO(one);
    });
  }
}
