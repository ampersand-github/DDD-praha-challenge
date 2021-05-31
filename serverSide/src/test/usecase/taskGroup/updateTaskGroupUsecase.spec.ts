import { InMemoryTaskGroupRepository } from '../../../infra/db/inMemory/inMemoryTaskGroupRepository';
import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';
import { UpdateTaskGroupUsecase } from '../../../usecase/taskGroup/UpdateTaskGroupUsecase';

describe('UpdateTaskGroupUsecase', (): void => {
  const repo = new InMemoryTaskGroupRepository();
  const usecase = new UpdateTaskGroupUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]', async () => {
      // データ作成
      const data = { name: TaskGroupEnum.test };
      const taskGroup = TaskGroup.create({ taskGroup: data.name });
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'update')
        .mockResolvedValueOnce(taskGroup);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(taskGroup);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[正常]リポジトリからERRORクラスが返る', async () => {
      // データ作成
      const expected = new Error('error');
      const data = { name: TaskGroupEnum.test };
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'update')
        .mockResolvedValueOnce(expected);

      // 結果確認
      await expect(async () => {
        await usecase.do(data);
      }).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const data = { name: TaskGroupEnum.test };
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'update')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
