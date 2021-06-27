import { Participant } from '../../../domain/participant/participant';

export class EnrolledStatusDTO {
  public readonly enrolledStatus: string;
  public constructor(props: Participant) {
    this.enrolledStatus = props.enrolledStatus;
  }
}
