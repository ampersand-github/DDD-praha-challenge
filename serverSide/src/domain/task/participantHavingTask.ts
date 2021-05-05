import { ValueObject } from '../../shared/domain/ValueObject';
import { Task } from './task';
import { Participant } from '../participant/participant/participant';
import { ProgressStatus, ProgressStatusEnum } from './progressStatus';

interface ParticipantHavingTaskProps {
  participant: Participant;
  // todo ファーストクラスコレクション化すべきか？
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
    return status.props.progressStatus === ProgressStatusEnum.complete;
  }

  public changeStatus(
    task: Task,
    status: ProgressStatus,
  ): ParticipantHavingTask {
    if (this.existTask(task) === false) {
      throw new Error('このタスクは存在しません');
    }
    if (this.isComplete(task) === true) {
      throw new Error('完了ステータスになっているタスクは変更できません');
    }

    this.props.statusForEveryTask.set(task, status);
    return new ParticipantHavingTask(this.props);
  }

  public getTaskFromName(name: string): Task | void {
    let returnValue;
    this.props.statusForEveryTask.forEach(
      (status: ProgressStatus, task: Task) => {
        if (task.props.name.toString() === name) {
          returnValue = task;
        }
      },
    );
    if(returnValue === undefined) {
      throw new Error('タスクの名前が間違っています');
    }
    return returnValue;
  }
}
