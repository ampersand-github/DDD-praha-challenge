export class ParticipantAR {
  // Todo 集約ルートを作る
  private readonly participantId: string;
  public constructor(props: { participantId: string }) {
    const { participantId } = props;
    this.participantId = participantId;
  }
  public getAllProperties() {
    return {
      participantId: this.participantId,
    };
  }
}
