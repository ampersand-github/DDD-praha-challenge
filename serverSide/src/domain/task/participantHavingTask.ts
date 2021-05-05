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
  static create(props: ParticipantHavingTaskProps): ParticipantHavingTask {
    return new ParticipantHavingTask(props);
  }

  public existTask(task): boolean {
    return this.props.statusForEveryTask.has(task);
  }
  public isComplete(task): boolean {
    const status = this.props.statusForEveryTask.get(task);

    return status.values.progressStatus === ProgressStatusEnum.complete;

  }

  public changeStatus(
    task: Task,
    status: ProgressStatus,
  ): ParticipantHavingTask {
    if (!this.existTask(task)) {
      throw new Error('このタスクは存在しません');
    }
    if (this.isComplete(task)) {

      throw new Error('完了ステータスになっているタスクは変更できません');
    }

    this.props.statusForEveryTask.set(task, status);
    return new ParticipantHavingTask(this.props);
  }


  public getTaskFromName(name: string) {
    for (const task of this.props.statusForEveryTask.keys()) {
      if (task.values.name.toString() === name) {
        return task;
      }
    }
    throw new Error('タスクの名前が間違っています');

  }
}
