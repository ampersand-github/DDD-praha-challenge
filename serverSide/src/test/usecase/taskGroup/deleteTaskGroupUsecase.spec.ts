import { InMemoryTaskGroupRepository } from '../../../infra/db/inMemory/inMemoryTaskGroupRepository';
import { DeleteTaskGroupUsecase } from '../../../usecase/taskGroup/DeleteTaskGroupUsecase';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { TaskGroupEnum } from '../../../domain/taskGroup/taskGroup';
import { TaskGroupDeleteDomainService } from '../../../domain/taskGroup/taskGroupDeleteDomainService';

describe('DeleteTaskGroupUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const usecase = new DeleteTaskGroupUsecase(taskRepository, participantRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('delete', (): void => {
    test('[正常]削除できる', async () => {
      // データ作成
      const data = { taskGroup: TaskGroupEnum.db };
      const spy = jest.spyOn(TaskGroupDeleteDomainService.prototype, 'do').mockResolvedValueOnce();

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]', async () => {
      // データ作成
      const data = { taskGroup: TaskGroupEnum.db };
      const expected = new Error('error');
      const spy = jest
        .spyOn(TaskGroupDeleteDomainService.prototype, 'do')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
