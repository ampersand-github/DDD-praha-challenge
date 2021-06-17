import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { CreateTaskUsecase } from '../../../usecase/task/createTaskUsecase';
import { TaskGroup, TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';
import { Task } from '../../../domain/task/task';
import { TaskDTO } from '../../../usecase/task/DTO/taskDTO';
import { TaskFactory } from '../../../domain/task/taskFactory';

describe('CreateTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const taskFactory = new TaskFactory(repo);
  const usecase = new CreateTaskUsecase(repo, taskFactory);

  const inputData = {
    name: 'create',
    description: 'description',
    group: TaskGroupEnum.db,
  };
  const group = TaskGroup.create({
    taskGroup: TaskGroupEnum.db,
  });
  const task = Task.create({
    no: 1,
    name: inputData.name,
    description: inputData.description,
    group: group,
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]作成できる場合', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'create')
        .mockResolvedValueOnce(task);

      // 結果確認
      expect(await usecase.do(inputData)).toStrictEqual(new TaskDTO(task));
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'create')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(inputData)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
