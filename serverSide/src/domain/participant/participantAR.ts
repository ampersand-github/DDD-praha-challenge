export class ParticipantAR {
  // todo private or protected
  // todo readonly or static
  private readonly participantId: string;
  private readonly name: string;
  private readonly mailAddress: string;
  private readonly enrolledStatus: string;
  // todo ペアとかチームとか
  public constructor(props: {
    participantId: string;
    name: string;
    mailAddress: string;
    enrolledStatus: string;
  }) {
    const { participantId, name, mailAddress, enrolledStatus } = props;
    this.participantId = participantId;
    this.name = name;
    this.mailAddress = mailAddress;
    this.enrolledStatus = enrolledStatus;
  }

  public getAllProperties() {
    return {
      participantId: this.participantId,
      name: this.name,
      mailAddress: this.enrolledStatus,
    };
  }
}
