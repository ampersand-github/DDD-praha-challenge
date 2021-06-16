import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { EnrolledStatus, EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { EnrolledStatusDTO } from '../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyParticipant1 } from '../../../testUtil/dummyPerticipant';
import { ToRecessStatusUsecase } from '../../../usecase/participant/toRecessStatusUsecase';

describe('ToRecessStatusUsecase', (): void => {
  const repo = new InMemoryParticipantRepository();
  const usecase = new ToRecessStatusUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]在籍ステータスを休会中に変更できる', async () => {
      // データ作成
      const data = { participantId: new UniqueEntityID().toValue() };
      //
      const recessData = { enrolledStatus: EnrolledStatusEnum.recess };
      const recess = EnrolledStatus.create(recessData);
      const recessStatusDTO = new EnrolledStatusDTO(recess);
      //
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'updateEnrolledStatus')
        .mockResolvedValueOnce(recess);
      // 結果確認
      // todo チーム・ペアの削除
      await expect(usecase.do(data)).resolves.toStrictEqual(recessStatusDTO);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
