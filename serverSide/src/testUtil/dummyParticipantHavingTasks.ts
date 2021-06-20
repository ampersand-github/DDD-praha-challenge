import { dummyTask1, dummyTask2, dummyTask3 } from './dummyTask';
import { ProgressStatus, ProgressStatusEnum } from '../domain/participant/progressStatus';
import { Task } from '../domain/task/task';
import { ParticipantHavingTasks } from '../domain/participant/participantHavingTasks';

const complete = ProgressStatusEnum.complete;
const readyForReview = ProgressStatusEnum.readyForReview;
const notStarted = ProgressStatusEnum.notStarted;

export const dummyStatusAndTasksData = new Map<Task, ProgressStatus>([
  [dummyTask1, ProgressStatus.create({ progressStatus: readyForReview })],
  [dummyTask2, ProgressStatus.create({ progressStatus: complete })],
  [dummyTask3, ProgressStatus.create({ progressStatus: notStarted })],
]);
export const dummyParticipantHavingTasksData1 = {
  statusAndTasks: dummyStatusAndTasksData,
};
export const dummyParticipantHavingTasks1 = ParticipantHavingTasks.create(
  dummyParticipantHavingTasksData1,
);
