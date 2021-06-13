import { InMemoryTaskRepository } from '../../../../infra/db/inMemory/inMemoryTaskRepository';
import { TaskFactory } from '../../../../domain/task/taskFactory';
import { TaskGroupEnum } from '../../../../domain/taskGroup/taskGroup';
import { Task } from '../../../../domain/task/task';

describe('TaskFactory', () => {
  const taskRepository = new InMemoryTaskRepository();
  const taskFactory = new TaskFactory(taskRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[異常]成功する', async () => {
      // データ作成
      const data = {
        name: 'ダミー',
        description: 'ダミー',
        group: TaskGroupEnum.db,
      };
      const spy1 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'nextTaskNo')
        .mockResolvedValueOnce(999);
      // 結果確認
      const result = taskFactory.factory(data);
      await expect(result).resolves.toBeInstanceOf(Task);
      expect(spy1).toHaveBeenCalledTimes(1);
    });
    test('[異常]現在のタスクナンバー最大値の次の値を取れない', async () => {
      // データ作成
      const data = {
        name: 'ダミー',
        description: 'ダミー',
        group: TaskGroupEnum.db,
      };
      const expected = new Error('error');
      const spy2 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'nextTaskNo')
        .mockRejectedValueOnce(expected);
      // 結果確認
      await expect(taskFactory.factory(data)).rejects.toThrowError('error');
      expect(spy2).toHaveBeenCalledTimes(1);
    });
    test('[異常]taskGroupの生成に失敗する', async () => {
      // データ作成
      const data = {
        name: 'ダミー',
        description: 'ダミー',
        group: 'ダミー',
      };
      const spy1 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'nextTaskNo')
        .mockResolvedValueOnce(999);
      // 結果確認
      await expect(taskFactory.factory(data)).rejects.toThrowError('タスクグループ名が不正です。');
      expect(spy1).toHaveBeenCalledTimes(0);
    });
  });
});
