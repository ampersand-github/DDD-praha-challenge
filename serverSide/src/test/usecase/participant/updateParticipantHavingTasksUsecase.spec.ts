import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { dummyTask1, dummyTask4 } from '../../../testUtil/dummyTask';
import { ParticipantHavingTasksDTO } from '../../../usecase/participant/DTO/participantHavingTasksDTO';
import { ProgressStatusEnum } from '../../../domain/participant/progressStatus';
import { dummyParticipant1 } from '../../../testUtil/dummyPerticipant';
import { UpdateParticipantHavingTasksUsecase } from '../../../usecase/participant/updateProgressStatusUsecase';

describe('UpdateProgressStatusUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const usecase = new UpdateParticipantHavingTasksUsecase(participantRepository, taskRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]タスクのステータスを変更できる', async () => {
      // データ作成
      const data = {
        participantId: 'aaa',
        taskId: 'aaa',
        progressStatus: ProgressStatusEnum.complete,
      };
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy3 = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyTask1);
      // 結果確認
      const result = await usecase.do(data);
      await expect(result).toBeInstanceOf(ParticipantHavingTasksDTO);
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
      await expect(usecase.do(data)).rejects.toThrowError('このタスクは存在しません');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
