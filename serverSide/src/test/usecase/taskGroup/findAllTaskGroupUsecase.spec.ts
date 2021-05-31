import { InMemoryTaskGroupRepository } from '../../../infra/db/inMemory/inMemoryTaskGroupRepository';
import { TaskGroup, TaskGroupEnum } from '../../../domain/task/taskGroup';
import { TaskGroupDTO } from '../../../dto/usecase/task/taskGroupDTO';
import { FindAllTaskGroupUsecase } from '../../../usecase/taskGroup/FindAllTaskGroupUsecase';

describe('FindAllTaskGroupUsecase', (): void => {
  const repo = new InMemoryTaskGroupRepository();
  const usecase = new FindAllTaskGroupUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const taskGroup1 = TaskGroup.create({ taskGroup: TaskGroupEnum.test });
      const taskGroup2 = TaskGroup.create({ taskGroup: TaskGroupEnum.db });
      const taskGroup1DTO = new TaskGroupDTO(taskGroup1);
      const taskGroup2DTO = new TaskGroupDTO(taskGroup2);
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'findAll')
        .mockResolvedValueOnce([taskGroup1, taskGroup2]);

      // 結果確認
      expect(await usecase.do()).toStrictEqual([taskGroup1DTO, taskGroup2DTO]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'findAll')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do()).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
