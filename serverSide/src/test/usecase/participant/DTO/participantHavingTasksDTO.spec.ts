import { ParticipantHavingTasksDTO } from '../../../../usecase/participant/DTO/participantHavingTasksDTO';
import { TaskDTO } from '../../../../usecase/task/DTO/taskDTO';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummyTask';
import { dummyParticipantHavingTasks1 } from '../../../../testUtil/dummyParticipantHavingTasks';

describe('ParticipantHavingTasksDTO', (): void => {
  describe('constructor', (): void => {
    test('[正常]返り値が取得できる', () => {
      const actual = new ParticipantHavingTasksDTO(dummyParticipantHavingTasks1);
      expect(actual.participantHavingTasks).toStrictEqual([
        [new TaskDTO(dummyTask1), 'レビュー待ち'],
        [new TaskDTO(dummyTask2), '完了'],
        [new TaskDTO(dummyTask3), '未着手'],
      ]);
    });
  });
});
