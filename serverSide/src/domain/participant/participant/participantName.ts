import { ValueObject } from '../../../shared/domain/ValueObject';

interface ParticipantNameProps {
  participantName: string;
}

export class ParticipantName extends ValueObject<ParticipantNameProps> {
  public static minimumLength: number = 2;

  get value(): string {
    return this.props.participantName;
  }

  private constructor(props: ParticipantNameProps) {
    super(props);
  }
  static create(props: ParticipantNameProps): ParticipantName {
    if (props.participantName.length < this.minimumLength) {
      console.log(props.participantName.length);
      console.log(props.participantName);
      throw new Error('名前をフルネームで入力してください。');
    }
    return new ParticipantName(props);
  }
}
