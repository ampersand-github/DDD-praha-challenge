import { ProgressStatus, ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { dummyTask1, dummyTask2 } from '../../../testUtil/dummy/dummyTask';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask';

describe('ParticipantHavingTask', () => {
  // データ作成
  const complete = ProgressStatus.create({ progressStatus: ProgressStatusEnum.complete });
  const readyForReview = ProgressStatus.create({
    progressStatus: ProgressStatusEnum.readyForReview,
  });

  const dummyParticipantHavingTask1 = { task: dummyTask1, progressStatus: complete };
  const dummyParticipantHavingTask2 = { task: dummyTask2, progressStatus: readyForReview };

  describe('constructor', () => {
    test('[正常]', () => {
      const participantHavingTask1 = ParticipantHavingTask.create(dummyParticipantHavingTask1);
      expect(participantHavingTask1.participantHavingTask).toBe(dummyParticipantHavingTask1);
    });
  });
  describe('changeProgressStatus', () => {
    test('[正常]', () => {
      const participantHavingTask2 = ParticipantHavingTask.create(dummyParticipantHavingTask2);
      const result = participantHavingTask2.changeProgressStatus(ProgressStatusEnum.complete);
      expect(result.progressStatus.progressStatus).toBe(ProgressStatusEnum.complete);
    });
  });
});
