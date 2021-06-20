import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { ParticipantHavingTasks } from '../../../domain/participant/participantHavingTasks';
import {
  dummyParticipantHavingTasks1,
  dummyStatusAndTasksData,
} from '../../../testUtil/dummy/dummyParticipantHavingTasks';
import { dummyTask1, dummyTask2, dummyTask3, dummyTask4 } from '../../../testUtil/dummy/dummyTask';

describe('ParticipantHavingTask', () => {
  test('オブジェクトが生成できること', () => {
    expect(dummyParticipantHavingTasks1).toBeInstanceOf(ParticipantHavingTasks);
  });

  describe('getStatusFromTask', () => {
    const actual = dummyParticipantHavingTasks1;
    test('task1を指定するとcompleteが返ってくる', () => {
      const status = actual.getStatusFromTask(dummyTask1);
      expect(status.progressStatus).toBe(ProgressStatusEnum.readyForReview);
    });
    test('存在しないタスクを指定するとエラーになる', () => {
      expect(() => {
        actual.getStatusFromTask(dummyTask4);
      }).toThrowError('指定されたタスクが存在しないのでステータスを取得できません。');
    });
  });

  describe('changeStatus', () => {
    const actual = dummyParticipantHavingTasks1;
    const complete = ProgressStatusEnum.complete;
    test('task3のステータスをnotStartedからcompleteへ変更する', () => {
      actual.changeStatus(dummyTask3, complete);
      expect(actual.getStatusFromTask(dummyTask3).progressStatus).toBe(ProgressStatusEnum.complete);
    });
    test('存在しないtaskのステータスを変更できない', () => {
      expect(() => {
        actual.changeStatus(dummyTask4, complete);
      }).toThrowError('このタスクは存在しません');
    });
    test('完了ステータスの場合は他のステータスに変更できない', () => {
      expect(() => {
        actual.changeStatus(dummyTask2, complete);
      }).toThrowError('完了ステータスになっているタスクは変更できません');
    });
  });
  describe('getStatusAndTasks', () => {
    test('取得できる', () => {
      expect(dummyParticipantHavingTasks1.statusAndTasks).toBe(dummyStatusAndTasksData);
    });
  });
});
