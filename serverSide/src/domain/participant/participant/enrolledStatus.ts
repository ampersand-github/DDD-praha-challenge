import { ValueObject } from '../../../shared/domain/ValueObject';

// todo DBとのマッピングをどうするか
export type EnrolledStatusType = '在籍中' | '休会中' | '退会済';

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
