import { InMemoryParticipantRepository } from '../../../../infra/db/inMemory/inMemoryParticipantRepository';
import { InMemoryTaskRepository } from '../../../../infra/db/inMemory/inMemoryTaskRepository';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../../../testUtil/dummyTask';
import { Participant } from '../../../../domain/participant/participant';
import { ParticipantFactory } from '../../../../domain/participant/service/participantFactory';

describe('participantFactory', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const participantServiceProps = {
    participantRepository: participantRepository,
    taskRepository: taskRepository,
  };
  const participantService = new ParticipantFactory(participantServiceProps);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('factory', (): void => {
    test('[正常]作成できる場合', async () => {
      // データ作成
      jest
        .spyOn(InMemoryParticipantRepository.prototype, 'isExistMailAddress')
        .mockResolvedValueOnce(true);
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyTask1, dummyTask2, dummyTask3]);
      const data = {
        participantName: '坂下幸子',
        mailAddress: 'sakashita@gmail.com',
      };
      // 結果確認
      expect(await participantService.factory(data)).toBeInstanceOf(Participant);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[異常]個人情報が重複している場合は登録できない', async () => {
      // データ作成
      jest
        .spyOn(InMemoryParticipantRepository.prototype, 'isExistMailAddress')
        .mockResolvedValueOnce(false);
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyTask1, dummyTask2, dummyTask3]);
      const data = {
        participantName: '坂下幸子',
        mailAddress: 'sakashita@gmail.com',
      };
      // 結果確認
      await expect(participantService.factory(data)).rejects.toThrowError(
        'このメールアドレスは既に存在していますので登録できません',
      );
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
