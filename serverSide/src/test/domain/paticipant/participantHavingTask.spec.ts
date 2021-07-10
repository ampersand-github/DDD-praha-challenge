import { ProgressStatus, ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { dummyTask1 } from '../../../testUtil/dummy/dummyTask';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask';

describe('ParticipantHavingTask', () => {
  // データ作成
  const complete = ProgressStatus.create({ progressStatus: ProgressStatusEnum.complete });
  const dummyParticipantHavingTask1 = { task: dummyTask1, progressStatus: complete };

  describe('constructor', () => {
    test('[正常]', () => {
      const participantHavingTask1 = ParticipantHavingTask.create(dummyParticipantHavingTask1);
      expect(participantHavingTask1.participantHavingTask).toStrictEqual(
        dummyParticipantHavingTask1,
      );
    });
  });
});
