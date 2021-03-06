import { ValueObject } from '@/domain/shared/valueObject';

interface ParticipantNameProps {
  participantName: string;
}

export class ParticipantName extends ValueObject<ParticipantNameProps> {
  public get participantName() {
    return this.props.participantName;
  }

  private constructor(props: ParticipantNameProps) {
    super(props);
  }
  public static create(props: ParticipantNameProps): ParticipantName {
    ParticipantName.validation_format(props.participantName);
    return new ParticipantName(props);
  }
  private static validation_format(participantName: string): void {
    if (!participantName) {
      throw new Error('名前を入力してください。');
    }
  }
}
