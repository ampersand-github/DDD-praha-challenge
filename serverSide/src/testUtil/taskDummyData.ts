import { Task } from '../domain/task/task';
import { TaskGroup, TaskGroupEnum } from '../domain/taskGroup/taskGroup';
import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../domain/participant/progressStatus';
import { ParticipantHavingTasks } from '../domain/participant/participantHavingTasks';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 課題
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const task1 = Task.create({
  no: 1,
  name: 'よく使うHTTPヘッダを理解する',
  description: 'HTTPは様々な情報をやりとりしますが...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});

export const task2 = Task.create({
  no: 2,
  name: 'curlとpostmanに慣れる',
  description: '何かAPIに不具合が起きた時、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});

export const task3 = Task.create({
  no: 3,
  name: 'リクエストをパースするWEBサーバを作ってみる',
  description: 'OSSのレポジトリにエラーを報告すると、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});
export const task4 = Task.create({
  no: 4,
  name: 'aaaa',
  description: 'aaaa、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
});

const complete = ProgressStatusEnum.complete;
const readyForReview = ProgressStatusEnum.readyForReview;
const notStarted = ProgressStatusEnum.notStarted;

const statusForEveryTaskData = new Map<Task, ProgressStatus>([
  [task1, ProgressStatus.create({ progressStatus: complete })],
  [task2, ProgressStatus.create({ progressStatus: readyForReview })],
  [task3, ProgressStatus.create({ progressStatus: notStarted })],
]);
export const participantHavingTask1Data = {
  statusForEveryTasks: statusForEveryTaskData,
};
export const participantHavingTask1 = ParticipantHavingTasks.create(
  participantHavingTask1Data,
);
