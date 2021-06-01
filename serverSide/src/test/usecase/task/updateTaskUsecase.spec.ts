import { TaskGroup } from '../../../domain/task/taskGroup';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTasRepository';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Task } from '../../../domain/task/task';
import { UpdateTaskUsecase } from '../../../usecase/task/updateTaskUsecase';

describe('UpdateTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new UpdateTaskUsecase(repo);

  const data = {
    taskId: new UniqueEntityID().toValue(),
    newNo: 1,
    newName: 'newName',
    newDescription: 'newDescription',
    newGroup: 'DB',
  };
  const task = Task.create({
    no: data.newNo,
    name: data.newName,
    description: data.newDescription,
    group: TaskGroup.create({ taskGroup: data.newGroup }),
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]更新できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'update')
        .mockResolvedValueOnce(task);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(task);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[正常]リポジトリからERRORクラスが返る', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'update')
        .mockResolvedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
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
