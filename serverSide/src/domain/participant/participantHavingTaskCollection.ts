import { Task } from '../task/task';
import { ProgressStatus } from './progressStatus';
import { ParticipantHavingTask } from './participantHavingTask';
import { Collection } from '../shared/FirstclassCollection';

interface ParticipantHavingTaskCollectionProps {
  participantHavingTaskCollection: ParticipantHavingTask[];
}

export class ParticipantHavingTaskCollection extends Collection<ParticipantHavingTaskCollectionProps> {
  public get participantHavingTaskCollection(): ParticipantHavingTask[] {
    return this.props.participantHavingTaskCollection;
  }
  private constructor(props: ParticipantHavingTaskCollectionProps) {
    super(props);
  }
  public static create(
    props: ParticipantHavingTaskCollectionProps,
  ): ParticipantHavingTaskCollection {
    const sortedList = ParticipantHavingTaskCollection.sort(props.participantHavingTaskCollection);
    return new ParticipantHavingTaskCollection({ participantHavingTaskCollection: sortedList });
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
  public changeProgressStatus(task: Task, status: string): ParticipantHavingTaskCollection {
    // todo private メソッドにしてよい
    const findResult = this.props.participantHavingTaskCollection.find((one) =>
      one.task.equals(task),
    );
    if (findResult === undefined) {
      throw new Error('指定されたタスクが存在しません。');
    }

    const updated = this.props.participantHavingTaskCollection.map((one) => {
      if (!one.task.equals(task)) {
        return one;
      } else {
        const newStatus = ProgressStatus.create({ progressStatus: status });
        return ParticipantHavingTask.create({ task: task, progressStatus: newStatus });
      }
    });
    this.props.participantHavingTaskCollection = ParticipantHavingTaskCollection.sort(updated);

    return this;
  }

  private find(task: Task) {
    return this.props.participantHavingTaskCollection.find((one) => one.task.equals(task));
  }

  private static sort(list: ParticipantHavingTask[]): ParticipantHavingTask[] {
    return list.sort((a, b) =>
      a.participantHavingTask.task.no > b.participantHavingTask.task.no ? 1 : -1,
    );
  }
}
