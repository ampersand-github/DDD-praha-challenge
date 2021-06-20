import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { ToEnrolledStatusUsecase } from '../../../usecase/participant/toEnrolledStatusUsecase';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';
import { EnrolledStatus, EnrolledStatusEnum } from '../../../domain/participant/enrolledStatus';
import { EnrolledStatusDTO } from '../../../usecase/participant/DTO/enrolledStatusDTO';
import { dummyParticipant1 } from '../../../testUtil/dummyPerticipant';

describe('ToEnrolledStatusUsecase', (): void => {
  const repo = new InMemoryParticipantRepository();
  const usecase = new ToEnrolledStatusUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]在籍ステータスを在籍中に変更できる', async () => {
      // データ作成
      const data = { participantId: new UniqueEntityID().toValue() };
      //
      const enrolledData = { enrolledStatus: EnrolledStatusEnum.enrolled };
      const enrolled = EnrolledStatus.create(enrolledData);
      const enrolledStatusDTO = new EnrolledStatusDTO(enrolled);
      //
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'updateEnrolledStatus')
        .mockResolvedValueOnce(enrolled);
      // 結果確認
      await expect(usecase.do(data)).resolves.toStrictEqual(enrolledStatusDTO);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
