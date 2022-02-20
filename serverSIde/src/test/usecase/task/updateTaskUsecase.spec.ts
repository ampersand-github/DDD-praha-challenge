import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { UpdateTaskUsecase, UpdateTaskUsecaseProps } from '../../../usecase/task/updateTaskUsecase';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { TaskGroup } from '../../../domain/taskGroup/taskGroup';
import { Task } from '../../../domain/task/task';
import { TaskDTO } from '../../../usecase/task/DTO/taskDTO';

describe('UpdateTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new UpdateTaskUsecase(repo);

  const data: UpdateTaskUsecaseProps = {
    taskId: new UniqueEntityID().toValue(),
    updateNo: 1,
    updateName: 'newName',
    updateDescription: 'newDescription',
    updateGroup: 'DB',
  };
  const task = Task.create({
    no: data.updateNo,
    name: data.updateName,
    description: data.updateDescription,
    group: TaskGroup.create({ taskGroup: data.updateGroup }),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]更新できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'update')
        .mockResolvedValueOnce(task);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(new TaskDTO(task));
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'update')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
