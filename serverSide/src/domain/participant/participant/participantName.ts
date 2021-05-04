import { ValueObject } from '../../../shared/domain/ValueObject';

interface ParticipantNameProps {
  participantName: string;
}

export class ParticipantName extends ValueObject<ParticipantNameProps> {
  public static minimumLength = 0;

  private constructor(props: ParticipantNameProps) {
    super(props);
  }
  static create(props: ParticipantNameProps): ParticipantName {
    if (props.participantName.length <= this.minimumLength) {
      throw new Error('名前をフルネームで入力してください。');
    }
    return new ParticipantName(props);
  }
}
