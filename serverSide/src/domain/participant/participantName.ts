import { ValueObject } from '../shared/ValueObject';

interface ParticipantNameProps {
  participantName: string;
}

export class ParticipantName extends ValueObject<ParticipantNameProps> {
  private static minimumLength = 0;

  public get participantName() {
    return this.props.participantName;
  }

  private constructor(props: ParticipantNameProps) {
    super(props);
  }
  public static create(props: ParticipantNameProps): ParticipantName {
    if (props.participantName.length <= this.minimumLength) {
      throw new Error('名前をフルネームで入力してください。');
    }
    return new ParticipantName(props);
  }
}
