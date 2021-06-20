import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { EnrolledStatus, EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { EnrolledStatusDTO } from '../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyParticipant1 } from '../../../testUtil/dummyPerticipant';
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
      const withdrawalData = { enrolledStatus: EnrolledStatusEnum.withdrawal };
      const withdrawal = EnrolledStatus.create(withdrawalData);
      const withdrawalStatusDTO = new EnrolledStatusDTO(withdrawal);
      //
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'updateEnrolledStatus')
        .mockResolvedValueOnce(withdrawal);
      // 結果確認
      // todo チーム・ペアの削除のドメインサービスをつくる
      await expect(usecase.do(data)).resolves.toStrictEqual(withdrawalStatusDTO);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
