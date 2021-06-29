import { Task } from '../task/task';
import { ProgressStatus } from './progressStatus';
import { ParticipantHavingTask } from './participantHavingTask';
import { ValueObject } from '../shared/ValueObject';

interface ParticipantHavingTaskCollectionProps {
  participantHavingTaskList: ParticipantHavingTask[];
}

export class ParticipantHavingTaskCollection extends ValueObject<ParticipantHavingTaskCollectionProps> {
  public get participantHavingTaskCollection(): ParticipantHavingTask[] {
    return this.props.participantHavingTaskList;
  }
  private constructor(props: ParticipantHavingTaskCollectionProps) {
    super(props);
  }
  public static create(
    props: ParticipantHavingTaskCollectionProps,
  ): ParticipantHavingTaskCollection {
    return new ParticipantHavingTaskCollection(props);
  }

  public getStatusFromTask(task: Task): ProgressStatus {
    const result = this.props.participantHavingTaskList.find((one) => one.task.equals(task));
    if (result === undefined) {
      throw new Error('指定されたタスクが存在しません。');
    }
    return result.progressStatus;
  }

  // タスク(引数)の現在の進捗ステータスを進捗ステータス(引数)へ変更する
  public changeStatus(task: Task, status: string): ParticipantHavingTaskCollection {
    const participantHavingTask = this.props.participantHavingTaskList.filter((one) =>
      one.task.equals(task),
    );
    if (participantHavingTask[0] === undefined) {
      throw new Error('指定されたタスクが存在しません。');
    }
    participantHavingTask[0].changeProgressStatus(status);
    return this;
  }
}
