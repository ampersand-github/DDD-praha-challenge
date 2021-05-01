import { Participant } from '../../../domain/participant/participant/participant';

export class ParticipantDTO {
  public readonly name: string;
  public readonly mailAddress: string;
  public constructor(participant: Participant) {
    this.name = participant.props.participantName.props.participantName;
    this.mailAddress = participant.props.mailAddress.props.mailAddress;
  }
}
