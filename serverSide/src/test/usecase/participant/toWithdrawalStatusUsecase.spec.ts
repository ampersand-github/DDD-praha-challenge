import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { EnrolledStatusDTO } from '../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { ToWithdrawalStatusUsecase } from '../../../usecase/participant/toWithdrawalStatusUsecase';

describe('ToWithdrawalStatusUsecase', (): void => {
  const repo = new InMemoryParticipantRepository();
  const usecase = new ToWithdrawalStatusUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]在籍ステータスを休会中に変更できる', async () => {
      // データ作成
      const data = { participantId: new UniqueEntityID().toValue() };
      //
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyParticipant1);
      // 結果確認
      await expect(usecase.do(data)).resolves.toBeInstanceOf(EnrolledStatusDTO);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
