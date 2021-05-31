import { Task } from '../../domain/task/task';
import { TaskGroup, TaskGroupEnum } from '../../domain/task/taskGroup';
import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../../domain/participantHavingTask/progressStatus';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 課題
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const task1Data = {
  no: 1,
  name: 'よく使うHTTPヘッダを理解する',
  description: 'HTTPは様々な情報をやりとりしますが...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
};
const id1 = new UniqueEntityID('99999999-9999-9999-aaaa-999999999999');
export const task1 = Task.create(task1Data, id1);

const task2Data = {
  no: 2,
  name: 'curlとpostmanに慣れる',
  description: '何かAPIに不具合が起きた時、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
};
const id2 = new UniqueEntityID('99999999-9999-9999-bbbb-999999999999');
export const task2 = Task.create(task2Data, id2);

const task3Data = {
  no: 3,
  name: 'リクエストをパースするWEBサーバを作ってみる',
  description: 'OSSのレポジトリにエラーを報告すると、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
};
const id3 = new UniqueEntityID('99999999-9999-9999-cccc-999999999999');
export const task3 = Task.create(task3Data, id3);

const task4Data = {
  no: 4,
  name: 'aaaa',
  description: 'aaaa、...',
  group: TaskGroup.create({ taskGroup: TaskGroupEnum.webBasic }),
};
const id4 = new UniqueEntityID('99999999-9999-9999-dddd-999999999999');
export const task4 = Task.create(task4Data, id4);

const complete = ProgressStatusEnum.complete;
const readyForReview = ProgressStatusEnum.readyForReview;
const notStarted = ProgressStatusEnum.notStarted;

export const statusForEveryTaskData = new Map<Task, ProgressStatus>([
  [task1, ProgressStatus.create({ progressStatus: complete })],
  [task2, ProgressStatus.create({ progressStatus: readyForReview })],
  [task3, ProgressStatus.create({ progressStatus: notStarted })],
]);
