import { InMemoryTaskGroupRepository } from '../../../infra/db/inMemory/inMemoryTaskGroupRepository';
import { TaskGroup, TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';
import { CreateTaskGroupUsecase } from '../../../usecase/taskGroup/CreateTaskGroupUsecase';
import { TaskGroupDTO } from '../../../usecase/taskGroup/DTO/taskGroupDTO';

describe('CreateTaskGroupUsecase', (): void => {
  const repo = new InMemoryTaskGroupRepository();
  const usecase = new CreateTaskGroupUsecase(repo);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]作成できる場合', async () => {
      // データ作成
      const data = { name: TaskGroupEnum.test };
      const taskGroup = TaskGroup.create({ taskGroup: data.name });
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'create')
        .mockResolvedValueOnce(taskGroup);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(new TaskGroupDTO(taskGroup));
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const data = { name: TaskGroupEnum.test };
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'create')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
