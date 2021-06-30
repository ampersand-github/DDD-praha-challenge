import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { dummyTask2, dummyTask4 } from '../../../testUtil/dummy/dummyTask';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { dummyParticipant1, dummyParticipant2 } from '../../../testUtil/dummy/dummyPerticipant';
import { UpdateParticipantHavingTasksUsecase } from '../../../usecase/participant/updateProgressStatusUsecase';
import { ParticipantHavingTaskCollectionDTO } from '../../../usecase/participant/DTO/participantHavingTasksDTO';

describe('UpdateProgressStatusUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const usecase = new UpdateParticipantHavingTasksUsecase(participantRepository, taskRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]タスクのステータスを変更できる', async () => {
      // データ作成
      const data = {
        participantId: 'aaa',
        taskId: 'aaa',
        progressStatus: ProgressStatusEnum.notStarted,
      };
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant2);
      const spy3 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyTask2);
      // 結果確認
      const result = await usecase.do(data);
      await expect(result).toBeInstanceOf(ParticipantHavingTaskCollectionDTO);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
    });

    test('[異常]進捗ステータスを変更で失敗する', async () => {
      // データ作成
      const data = {
        participantId: 'aaa',
        taskId: 'aaa',
        progressStatus: ProgressStatusEnum.complete,
      };
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyTask4); // 存在しないタスク
      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError('指定されたタスクが存在しません。');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
