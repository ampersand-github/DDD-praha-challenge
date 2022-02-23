import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { DeleteParticipantUsecase } from '../../../usecase/participant/deleteParticipantUsecase';
import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { ParticipantDTO } from '../../../usecase/participant/DTO/participantDTO';

describe('DeleteParticipantUsecase', (): void => {
  const repo = new InMemoryParticipantRepository();
  const usecase = new DeleteParticipantUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const data = { participantId: dummyParticipant1.id.toValue() };

      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);

      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'delete')
        .mockResolvedValueOnce(1);

      // 結果確認
      await expect(usecase.do(data)).resolves.toStrictEqual(new ParticipantDTO(dummyParticipant1));
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
