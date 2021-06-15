import { FindAllTaskUsecase } from '../../../usecase/task/findAllTaskUsecase';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { Task } from '../../../domain/task/task';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { TaskDTO } from '../../../usecase/task/DTO/taskDTO';

describe('FindAllTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new FindAllTaskUsecase(repo);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const task1 = Task.create({
        no: 1,
        name: 'newName',
        description: 'newDescription',
        group: TaskGroup.create({ taskGroup: 'DB' }),
      });
      const taskDTO1 = new TaskDTO(task1);
      const task2 = Task.create({
        no: 2,
        name: 'newName2',
        description: 'newDescription2',
        group: TaskGroup.create({ taskGroup: 'DB' }),
      });
      const taskDTO2 = new TaskDTO(task2);

      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findAll')
        .mockResolvedValueOnce([task1, task2]);

      // 結果確認
      expect(await usecase.do()).toStrictEqual([taskDTO1, taskDTO2]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findAll')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do()).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
