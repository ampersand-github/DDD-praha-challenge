import { Task } from '../task/task';
import { ProgressStatus } from './progressStatus';
import { ParticipantHavingTask } from './participantHavingTask';
import { ValueObject } from '../shared/ValueObject';

interface ParticipantHavingTaskCollectionProps {
  participantHavingTaskCollection: ParticipantHavingTask[];
}

export class ParticipantHavingTaskCollection extends ValueObject<ParticipantHavingTaskCollectionProps> {
  public get participantHavingTaskCollection(): ParticipantHavingTask[] {
    return this.props.participantHavingTaskCollection;
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
    const result = this.props.participantHavingTaskCollection.filter((one) =>
      one.task.equals(task),
    );
    if (result[0] === undefined) {
      throw new Error('指定されたタスクが存在しません。');
    }
    return result[0].progressStatus;
  }

  // タスク(引数)の現在の進捗ステータスを進捗ステータス(引数)へ変更する
  public changeStatus(task: Task, status: string): ParticipantHavingTaskCollection {
    const participantHavingTask = this.props.participantHavingTaskCollection.filter((one) =>
      one.task.equals(task),
    );
    if (participantHavingTask[0] === undefined) {
      throw new Error('指定されたタスクが存在しません。');
    }
    participantHavingTask[0].changeProgressStatus(status);
    return this;
  }
}
