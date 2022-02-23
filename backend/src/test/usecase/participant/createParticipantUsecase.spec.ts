import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { CreateParticipantUsecase } from '../../../usecase/participant/createParticipantUsecase';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { ParticipantDTO } from '../../../usecase/participant/DTO/participantDTO';
import { ParticipantFactory } from '../../../domain/participant/domainService/participantFactory';

describe('CreateParticipantUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const taskRepository = new InMemoryTaskRepository();
  const data = {
    participantRepository: participantRepository,
    taskRepository: taskRepository,
  };
  const participantService = new ParticipantFactory(data);
  const usecase = new CreateParticipantUsecase(participantRepository, participantService);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]データを作成できる', async () => {
      // データ作成
      const data = {
        participantName: 'aaa',
        mailAddress: 'aaa@gmail.com',
      };
      const participantDTO = new ParticipantDTO(dummyParticipant1);
      const spy = jest
        .spyOn(ParticipantFactory.prototype, 'factory')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'create')
        .mockResolvedValueOnce(dummyParticipant1);

      // 結果確認
      await expect(usecase.do(data)).resolves.toStrictEqual(participantDTO);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
