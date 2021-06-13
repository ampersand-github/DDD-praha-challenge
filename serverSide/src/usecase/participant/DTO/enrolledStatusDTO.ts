import { EnrolledStatus } from '../../../domain/participant/enrolledStatus';

export class EnrolledStatusDTO {
  public readonly enrolledStatus: string;
  public constructor(props: EnrolledStatus) {
    this.enrolledStatus = props.enrolledStatus;
  }
}
