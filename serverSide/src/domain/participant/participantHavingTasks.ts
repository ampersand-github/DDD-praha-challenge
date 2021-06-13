import { ValueObject } from '../shared/ValueObject';
import { Task } from '../task/task';

import { ProgressStatus } from './progressStatus';

interface ParticipantHavingTaskProps {
  statusAndTasks: Map<Task, ProgressStatus>;
}

export class ParticipantHavingTasks extends ValueObject<ParticipantHavingTaskProps> {
  public get statusAndTasks() {
    return this.props.statusAndTasks;
  }
  private constructor(props: ParticipantHavingTaskProps) {
    super(props);
  }
  public static create(props: ParticipantHavingTaskProps): ParticipantHavingTasks {
    return new ParticipantHavingTasks(props);
  }

  public getStatusFromTask(task: Task): ProgressStatus {
    const result = this.props.statusAndTasks.get(task);
    if (result !== undefined) {
      return result;
    }
    throw new Error('指定されたタスクが存在しないのでステータスを取得できません。');
  }

  // タスク(引数)の現在の進捗ステータスを進捗ステータス(引数)へ変更する
  public changeStatus(task: Task, status: string): ParticipantHavingTasks {
    if (!this.props.statusAndTasks.has(task)) {
      throw new Error('このタスクは存在しません');
    }
    // Map配列に格納されているタスクの対になるステータスを取得する
    const nowStatus: ProgressStatus = this.getStatusFromTask(task);
    // そのステータスを引数のステータスに変更する
    const newStatus: ProgressStatus = nowStatus.changeStatus(status);
    this.props.statusAndTasks.set(task, newStatus);
    // 返却
    return this;
  }
}
