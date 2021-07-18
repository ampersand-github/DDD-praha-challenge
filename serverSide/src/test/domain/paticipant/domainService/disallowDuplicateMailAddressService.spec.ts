import { InMemoryParticipantRepository } from '../../../../infra/db/inMemory/inMemoryParticipantRepository';
import { DisallowDuplicateMailAddressService } from '../../../../domain/participant/domainService/disallowDuplicateMailaddressService';

describe('DisallowDuplicateMailAddressService', () => {
  const participantRepository = new InMemoryParticipantRepository();
  const service = new DisallowDuplicateMailAddressService(participantRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]重複がない', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'isExistMailAddress')
        .mockResolvedValueOnce(true);
      // 結果確認
      const result = service.do({ mailAddress: 'aaa@gmail.com' });
      await expect(result).resolves.toBe(undefined);
      expect(spy1).toHaveBeenCalledTimes(1);
    });
    test('[異常]重複がある', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'isExistMailAddress')
        .mockResolvedValueOnce(false);
      // 結果確認
      const result = service.do({ mailAddress: 'aaa@gmail.com' });
      await expect(result).rejects.toThrowError(
        '既に存在するメールアドレスです。異なるメールアドレスを入力してください。',
      );
      expect(spy1).toHaveBeenCalledTimes(1);
    });
  });
});
