import {
  participantHavingTask1Data,
  task1,
  task3,
  task4,
} from '../dummyData/taskDummyData';
import { ParticipantHavingTask } from '../../../domain/participant/participantHavingTask/participantHavingTask';
import { ProgressStatusEnum } from '../../../domain/participant/participantHavingTask/progressStatus';

describe('ParticipantHavingTask', () => {
  test('オブジェクトが生成できること', () => {
    const actual = ParticipantHavingTask.create(participantHavingTask1Data);
    expect(actual).toBeInstanceOf(ParticipantHavingTask);
  });

  describe('getStatusFromTask', () => {
    const actual = ParticipantHavingTask.create(participantHavingTask1Data);
    test('task1を指定するとcompleteが返ってくる', () => {
      const status = actual.getStatusFromTask(task1);
      expect(status.progressStatus).toBe(ProgressStatusEnum.complete);
    });
    test('存在しないタスクを指定するとエラーになる', () => {
      expect(() => {
        actual.getStatusFromTask(task4);
      }).toThrowError(
        '指定されたtaskが存在しないのでステータスを取得できません。',
      );
    });
  });

  describe('changeStatus', () => {
    const actual = ParticipantHavingTask.create(participantHavingTask1Data);
    test('task3のステータスをnotStartedからcompleteへ変更する', () => {
      actual.changeStatus(task3, ProgressStatusEnum.complete);
      expect(actual.getStatusFromTask(task3).progressStatus).toBe(
        ProgressStatusEnum.complete,
      );
    });
    test('存在しないtaskのステータスを変更できない', () => {
      expect(() => {
        actual.changeStatus(task4, ProgressStatusEnum.complete);
      }).toThrowError('このタスクは存在しません');
    });
    test('完了ステータスの場合は他のステータスに変更できない', () => {
      expect(() => {
        actual.changeStatus(task1, ProgressStatusEnum.readyForReview);
      }).toThrowError('完了ステータスになっているタスクは変更できません');
    });
  });
});
