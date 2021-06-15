import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { FindOneTaskUsecase } from '../../../usecase/task/findOneTaskUsecase';
import { Task } from '../../../domain/task/task';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { TaskDTO } from '../../../usecase/task/DTO/taskDTO';

describe('FindOneTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new FindOneTaskUsecase(repo);

  const task1 = Task.create({
    no: 1,
    name: 'newName',
    description: 'newDescription',
    group: TaskGroup.create({ taskGroup: 'DB' }),
  });
  const taskDTO1 = new TaskDTO(task1);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const data = { id: task1.id.toValue() };
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findOne')
        .mockResolvedValueOnce(task1);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(taskDTO1);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const data = { id: task1.id.toValue() };
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findOne')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
