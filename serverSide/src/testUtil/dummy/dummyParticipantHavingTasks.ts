import { dummyTask1, dummyTask2, dummyTask3 } from './dummyTask';
import { ProgressStatus, ProgressStatusEnum } from '../../domain/participant/progressStatus';
import { ParticipantHavingTask } from '../../domain/participant/participantHavingTask';
import { ParticipantHavingTaskCollection } from '../../domain/participant/participantHavingTaskCollection';
import { UniqueEntityID } from '../../domain/shared/UniqueEntityID';

const complete = ProgressStatus.create({ progressStatus: ProgressStatusEnum.complete });
const readyForReview = ProgressStatus.create({
  progressStatus: ProgressStatusEnum.readyForReview,
});
const notStarted = ProgressStatus.create({ progressStatus: ProgressStatusEnum.notStarted });

export const dummyParticipantHavingTask1 = ParticipantHavingTask.create({
  task: dummyTask1,
  progressStatus: complete,
});
export const dummyParticipantHavingTask2 = ParticipantHavingTask.create({
  task: dummyTask2,
  progressStatus: readyForReview,
});
export const dummyParticipantHavingTask3 = ParticipantHavingTask.create({
  task: dummyTask3,
  progressStatus: notStarted,
});

export const dummyParticipantHavingTaskCollectionData1 = {
  participantHavingTaskCollection: [
    dummyParticipantHavingTask1,
    dummyParticipantHavingTask2,
    dummyParticipantHavingTask3,
  ],
};

export const dummyParticipantHavingTasks1 = ParticipantHavingTaskCollection.create({
  participantHavingTaskCollection: [
    ParticipantHavingTask.create(
      {
        task: dummyTask1,
        progressStatus: complete,
      },
      new UniqueEntityID('99999999-aaad-zzzz-bbbb-999999999999'),
    ),

    ParticipantHavingTask.create({
      task: dummyTask2,
      progressStatus: readyForReview,
    }),
    ParticipantHavingTask.create({
      task: dummyTask3,
      progressStatus: notStarted,
    }),
  ],
});

export const dummyParticipantHavingTasks2 = ParticipantHavingTaskCollection.create({
  participantHavingTaskCollection: [
    ParticipantHavingTask.create({
      task: dummyTask1,
      progressStatus: complete,
    }),
    ParticipantHavingTask.create({
      task: dummyTask2,
      progressStatus: readyForReview,
    }),
    ParticipantHavingTask.create({
      task: dummyTask3,
      progressStatus: notStarted,
    }),
  ],
});

export const dummyParticipantHavingTasks3 = ParticipantHavingTaskCollection.create({
  participantHavingTaskCollection: [
    ParticipantHavingTask.create({
      task: dummyTask1,
      progressStatus: complete,
    }),
    ParticipantHavingTask.create({
      task: dummyTask2,
      progressStatus: readyForReview,
    }),
    ParticipantHavingTask.create({
      task: dummyTask3,
      progressStatus: notStarted,
    }),
  ],
});
export const dummyParticipantHavingTasks1update = ParticipantHavingTaskCollection.create({
  participantHavingTaskCollection: [
    ParticipantHavingTask.create(
      {
        task: dummyTask1,
        progressStatus: complete,
      },
      new UniqueEntityID('99999999-aaad-zzzz-bbbb-999999999999'),
    ),

    ParticipantHavingTask.create({
      task: dummyTask2,
      progressStatus: complete,
    }),
    ParticipantHavingTask.create({
      task: dummyTask3,
      progressStatus: readyForReview,
    }),
  ],
});