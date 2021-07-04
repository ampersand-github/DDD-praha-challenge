import { ValueObject } from '../shared/ValueObject';

export const EnrolledStatusEnum = {
  enrolled: '在籍中',
  recess: '休会中',
  withdrawal: '退会済',
} as const;
type EnrolledStatusType = typeof EnrolledStatusEnum[keyof typeof EnrolledStatusEnum];

export interface EnrolledStatusProps {
  enrolledStatus: string;
}

export class EnrolledStatus extends ValueObject<EnrolledStatusProps> {
  public get enrolledStatus(): string {
    return this.props.enrolledStatus;
  }

  private constructor(props: EnrolledStatusProps) {
    super(props);
  }
  public static create(props: EnrolledStatusProps): EnrolledStatus {
    EnrolledStatus.validation_format(props.enrolledStatus);
    return new EnrolledStatus(props);
  }
  private static validation_format(enrolledStatus: string): void {
    if (!Object.values(EnrolledStatusEnum).includes(enrolledStatus as EnrolledStatusType)) {
      throw new Error('タスクグループ名が不正です。');
    }
  }
  // todo 一つ上の階層にあげる
  public changeEnrolledStatus(enrolledStatus: string): EnrolledStatus {
    EnrolledStatus.validation_format(enrolledStatus);
    this.props.enrolledStatus = enrolledStatus;
    return this;
  }
}
