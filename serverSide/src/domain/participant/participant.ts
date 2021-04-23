export class Participant {
  // todo private or protected
  // todo readonly or static
  private readonly participantId: String;
  private readonly name: String;
  private readonly mailAddress: String;
  private readonly enrolledStatus: String;
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
