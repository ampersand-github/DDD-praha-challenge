import { InMemoryPairRepository } from '../../../../infra/db/inMemory/inMemoryPairRepository';
import { DisallowDuplicatePairNameDomainService } from '../../../../domain/pair/domainService/disallowDuplicatePairNameDomainService';
import { dummyPair1, dummyPair2 } from '../../../../testUtil/dummy/dummyPair';

describe('DisallowDuplicatePairNameDomainService', () => {
  const pairRepository = new InMemoryPairRepository();
  const service = new DisallowDuplicatePairNameDomainService(pairRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]ペア名がまだ使用されていない', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair1, dummyPair2]);
      // 結果確認
      await expect(service.do({ pairName: 'z' })).resolves.toBe(undefined);
      expect(spy1).toHaveBeenCalledTimes(1);
    });
    test('[異常]ペア名が既に使用されている', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair1, dummyPair2]);
      // 結果確認
      await expect(service.do({ pairName: 'a' })).rejects.toThrowError(
        'このペア名は既に存在しています。',
      );
      expect(spy1).toHaveBeenCalledTimes(1);
    });
  });
});
