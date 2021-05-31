import { ValueObject } from '../../shared/domain/ValueObject';
import { Task } from '../task/task';

import { ProgressStatus, progressStatusType } from './progressStatus';

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

  public getStatusFromTask(task: Task): ProgressStatus {
    const result = this.props.statusForEveryTask.get(task);
    if (result !== undefined) {
      return result;
    }
    throw new Error(
      '指定されたtaskが存在しないのでステータスを取得できません。',
    );
  }

  public changeStatus(
    task: Task,
    status: progressStatusType,
  ): ParticipantHavingTask {
    if (!this.props.statusForEveryTask.has(task)) {
      throw new Error('このタスクは存在しません');
    }
    // Map配列に格納されているタスクの対になるステータスを取得する
    const nowStatus: ProgressStatus = this.getStatusFromTask(task);
    // そのステータスを引数のステータスに変更する
    const newStatus: ProgressStatus = nowStatus.changeStatus(status);
    this.props.statusForEveryTask.set(task, newStatus);
    return new ParticipantHavingTask(this.props);
  }
}
