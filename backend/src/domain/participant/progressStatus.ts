import { ValueObject } from '@/domain/shared/valueObject';

export const ProgressStatusEnum = {
  complete: '完了',
  readyForReview: 'レビュー待ち',
  notStarted: '未着手',
} as const;
export type progressStatusType = typeof ProgressStatusEnum[keyof typeof ProgressStatusEnum];

export interface ProgressStatusProps {
  progressStatus: string;
}

export class ProgressStatus extends ValueObject<ProgressStatusProps> {
  public get progressStatus() {
    return this.props.progressStatus;
  }

  private constructor(props: ProgressStatusProps) {
    super(props);
  }

  public static create(props: ProgressStatusProps): ProgressStatus {
    ProgressStatus.validation_format(props.progressStatus);
    return new ProgressStatus(props);
  }

  private static validation_format(progressStatus: string): void {
    if (!Object.values(ProgressStatusEnum).includes(progressStatus as progressStatusType)) {
      throw new Error('進捗ステータス名が不正です。');
    }
  }
}
