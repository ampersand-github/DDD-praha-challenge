import { ValueObject } from '../../../shared/domain/ValueObject';

// todo DBとのマッピングをどうするか

export const EnrolledStatusEnum = {
  enrolled: '在籍中',
  recess: '休会中',
  notStarted: '退会済',
} as const;
type EnrolledStatusType = typeof EnrolledStatusEnum[keyof typeof EnrolledStatusEnum];

export interface EnrolledStatusProps {
  enrolledStatus: EnrolledStatusType;
}

export class EnrolledStatus extends ValueObject<EnrolledStatusProps> {
  private constructor(props: EnrolledStatusProps) {
    super(props);
  }
  static create(props: EnrolledStatusProps): EnrolledStatus {
    return new EnrolledStatus(props);
  }
}
