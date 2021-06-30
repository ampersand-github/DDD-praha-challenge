import { TaskDTO } from '../../../../usecase/task/DTO/taskDTO';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummy/dummyTask';
import { ParticipantHavingTaskCollectionDTO } from '../../../../usecase/participant/DTO/participantHavingTasksDTO';
import { dummyParticipant1 } from '../../../../testUtil/dummy/dummyPerticipant';

describe('ParticipantHavingTasksDTO', (): void => {
  describe('constructor', (): void => {
    test('[正常]返り値が取得できる', () => {
      const actual = new ParticipantHavingTaskCollectionDTO(dummyParticipant1);
      expect(actual.tasks).toStrictEqual([
        [new TaskDTO(dummyTask1), '完了'],
        [new TaskDTO(dummyTask2), 'レビュー待ち'],
        [new TaskDTO(dummyTask3), '未着手'],
      ]);
    });
  });
});
