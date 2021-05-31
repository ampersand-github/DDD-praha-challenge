import { ValueObject } from '../../../shared/domain/ValueObject';

export const EnrolledStatusEnum = {
  enrolled: '在籍中',
  recess: '休会中',
  withdrawal: '退会済',
} as const;
type EnrolledStatusType = typeof EnrolledStatusEnum[keyof typeof EnrolledStatusEnum];

export interface EnrolledStatusProps {
  enrolledStatus: EnrolledStatusType;
}

export class EnrolledStatus extends ValueObject<EnrolledStatusProps> {
  public get enrolledStatus() {
    return this.props.enrolledStatus;
  }

  private constructor(props: EnrolledStatusProps) {
    super(props);
  }
  public static create(props: EnrolledStatusProps): EnrolledStatus {
    return new EnrolledStatus(props);
  }
}
