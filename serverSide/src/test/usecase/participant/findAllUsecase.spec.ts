import { FindAllParticipantUsecase } from '../../../usecase/participant/findAllUsecase';
import { PersonalInfoDTO } from '../../../usecase/participant/DTO/personalInfoDTO';
import { dummyPersonalIfo1, dummyPersonalIfo2 } from '../../../testUtil/dummyPersonalInfo';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';

describe('FindAllParticipantUsecase', (): void => {
  const repo = new InMemoryParticipantRepository();
  const usecase = new FindAllParticipantUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPersonalIfo1, dummyPersonalIfo2]);

      // 結果確認
      await expect(usecase.do()).resolves.toStrictEqual([
        new PersonalInfoDTO(dummyPersonalIfo1),
        new PersonalInfoDTO(dummyPersonalIfo2),
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]想定してないエラーが発生する', async () => {
      // データ作成
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findAll')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do()).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
