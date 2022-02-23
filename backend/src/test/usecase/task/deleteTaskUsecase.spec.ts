import { DeleteTaskUsecase } from '../../../usecase/task/deleteTaskUsecase';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { TaskDeleteDomainService } from '../../../domain/task/taskDeleteDomainService';

describe('DeleteTaskUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const usecase = new DeleteTaskUsecase(taskRepository, participantRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('delete', (): void => {
    test('[正常]削除できる', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const spy = jest.spyOn(TaskDeleteDomainService.prototype, 'do').mockResolvedValueOnce();

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const expected = new Error('error');
      const spy = jest
        .spyOn(TaskDeleteDomainService.prototype, 'do')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
