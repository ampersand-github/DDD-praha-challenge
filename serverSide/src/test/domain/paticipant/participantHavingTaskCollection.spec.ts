import { ParticipantHavingTaskCollection } from '../../../domain/participant/participantHavingTaskCollection';
import {
  dummyParticipantHavingTaskCollectionData1,
  dummyParticipantHavingTasks1,
} from '../../../testUtil/dummy/dummyParticipantHavingTasks';
import { dummyTask1, dummyTask4 } from '../../../testUtil/dummy/dummyTask';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';

describe('ParticipantHavingTaskCollection', () => {
  describe('constructor', () => {
    test('[正常]', () => {
      const result = ParticipantHavingTaskCollection.create(
        dummyParticipantHavingTaskCollectionData1,
      );
      expect(result).toBeInstanceOf(ParticipantHavingTaskCollection);
    });
  });
  describe('getStatusFromTask', () => {
    test('[正常]', () => {
      const result = dummyParticipantHavingTasks1.getStatusFromTask(dummyTask1);
      expect(result.progressStatus).toBe(ProgressStatusEnum.complete);
    });
    test('[異常]存在しないタスク', async () => {
      expect(() => {
        dummyParticipantHavingTasks1.getStatusFromTask(dummyTask4);
      }).toThrow('指定されたタスクが存在しません');
    });
  });
  describe('changeStatus', () => {
    test('[正常]', () => {
      const target = dummyParticipantHavingTasks1.participantHavingTaskCollection[1].task;
      const result = dummyParticipantHavingTasks1.recreateProgressStatus(
        target,
        ProgressStatusEnum.complete,
      );
      expect(result.getStatusFromTask(target).progressStatus).toBe(ProgressStatusEnum.complete);
    });
    test('[異常]存在しないタスク', async () => {
      expect(() => {
        dummyParticipantHavingTasks1.recreateProgressStatus(
          dummyTask4,
          ProgressStatusEnum.complete,
        );
      }).toThrow('指定されたタスクが存在しません');
    });
  });
});
