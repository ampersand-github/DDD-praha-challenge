import { ParticipantHavingTask } from '../../../domain/task/participantHavingTask';
import {
  complete,
  readyForReview,
  statusForEveryTaskData,
  task1,
  task3,
  task4,
} from '../dummyData/dummyData';

describe('ParticipantHavingTask', () => {
  test('オブジェクトが生成できること', () => {
    const actual = ParticipantHavingTask.create({
      statusForEveryTask: statusForEveryTaskData,
    });
    expect(actual).toBeInstanceOf(ParticipantHavingTask);
  });

  describe('getStatusFromTask', () => {
    const actual = ParticipantHavingTask.create({
      statusForEveryTask: statusForEveryTaskData,
    });
    test('task1を指定するとcompleteが返ってくる', () => {
      const status = actual.getStatusFromTask(task1);
      expect(status).toBe(complete);
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
    const actual = ParticipantHavingTask.create({
      statusForEveryTask: statusForEveryTaskData,
    });
    test('task3のステータスをnotStartedからcompleteへ変更する', () => {
      actual.changeStatus(task3, complete);
      expect(actual.getStatusFromTask(task3)).toBe(complete);
    });
    test('存在しないtaskのステータスを変更できない', () => {
      expect(() => {
        actual.changeStatus(task4, complete);
      }).toThrowError('このタスクは存在しません');
    });
    test('完了ステータスの場合は他のステータスに変更できない', () => {
      expect(() => {
        actual.changeStatus(task1, readyForReview);
      }).toThrowError('完了ステータスになっているタスクは変更できません');
    });
  });
});
