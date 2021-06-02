import { ValueObject } from '../../../shared/domain/ValueObject';

export const ProgressStatusEnum = {
  complete: '完了',
  readyForReview: 'レビュー待ち',
  notStarted: '未着手',
} as const;
export type progressStatusType = typeof ProgressStatusEnum[keyof typeof ProgressStatusEnum];

export interface ProgressStatusProps {
  progressStatus: progressStatusType;
}

export class ProgressStatus extends ValueObject<ProgressStatusProps> {
  public get progressStatus() {
    return this.props.progressStatus;
  }

  private constructor(props: ProgressStatusProps) {
    super(props);
  }
  public static create(props: ProgressStatusProps): ProgressStatus {
    // todo 別のやつと同じように修正
    return new ProgressStatus(props);
  }

  public changeStatus(updatedStatus: progressStatusType): ProgressStatus {
    if (this.progressStatus === ProgressStatusEnum.complete) {
      throw new Error('完了ステータスになっているタスクは変更できません');
    }

    return new ProgressStatus({ progressStatus: updatedStatus });
  }
}
