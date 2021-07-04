import { dummyParticipant1 } from '../../../testUtil/dummy/dummyPerticipant';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { UpdatePersonalInfoUsecase } from '../../../usecase/participant/updatePersonalInfoUsecase';
import { dummyPersonalIfo1 } from '../../../testUtil/dummy/dummyPersonalInfo';
import { DisallowDuplicateMailAddressService } from '../../../domain/participant/service/disallowDuplicateMailaddressService';

describe('UpdatePersonalInfoUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const service = new DisallowDuplicateMailAddressService(participantRepository);
  const usecase = new UpdatePersonalInfoUsecase(participantRepository, service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]メールアドレス・名前の変更ができること', async () => {
      // データ作成
      const data = {
        participantId: 'aaa',
        shouldUpdateName: 'aaa',
        shouldUpdateMailAddress: 'aaa@gmail.com',
      };
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(DisallowDuplicateMailAddressService.prototype, 'do')
        .mockResolvedValueOnce();
      const spy3 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyParticipant1);
      //
      // 結果確認
      const result = await usecase.do(data);
      await expect(result.mailAddress).toBe(data.shouldUpdateMailAddress);
      expect(result.participantName).toBe(dummyPersonalIfo1.participantName);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
    });
    test('[異常]idが存在しないので参加者を取得できない', async () => {
      const data = {
        participantId: 'aaa',
      };
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(null);
      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(new Error('この参加者は存在しません。'));
      expect(spy1).toHaveBeenCalledTimes(1);
    });
    test('[正常]メールアドレスと名前がないのでアップデートがない', async () => {
      // データ作成
      const data = {
        participantId: 'aaa',
      };
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1);
      const spy2 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyParticipant1);
      //
      // 結果確認
      const result = await usecase.do(data);
      expect(result.mailAddress).toBe(dummyParticipant1.mailAddress);
      expect(result.participantName).toBe(dummyPersonalIfo1.participantName);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
