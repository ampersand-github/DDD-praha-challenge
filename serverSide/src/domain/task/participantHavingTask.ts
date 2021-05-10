import { ValueObject } from '../../shared/domain/ValueObject';
import { Task } from './task';

import { ProgressStatus, ProgressStatusEnum } from './progressStatus';

interface ParticipantHavingTaskProps {
  statusForEveryTask: Map<Task, ProgressStatus>;
}

export class ParticipantHavingTask extends ValueObject<ParticipantHavingTaskProps> {
  private constructor(props: ParticipantHavingTaskProps) {
    super(props);
  }
  public static create(
    props: ParticipantHavingTaskProps,
  ): ParticipantHavingTask {
    return new ParticipantHavingTask(props);
  }

  public getStatusFromTask(task): ProgressStatus {
    const result = this.props.statusForEveryTask.get(task);
    if (result === undefined) {
      throw new Error(
        '指定されたtaskが存在しないのでステータスを取得できません。',
      );
    }
    return result;
  }

  public changeStatus(
    task: Task,
    status: ProgressStatus,
  ): ParticipantHavingTask {
    if (!this.props.statusForEveryTask.has(task)) {
      throw new Error('このタスクは存在しません');
    }
    const nowStatus = this.getStatusFromTask(task).progressStatus;
    if (nowStatus === ProgressStatusEnum.complete) {
      throw new Error('完了ステータスになっているタスクは変更できません');
    }

    this.props.statusForEveryTask.set(task, status);
    return new ParticipantHavingTask(this.props);
  }
}
