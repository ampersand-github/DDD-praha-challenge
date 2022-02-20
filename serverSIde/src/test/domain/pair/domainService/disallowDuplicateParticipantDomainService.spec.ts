import { InMemoryPairRepository } from '../../../../infra/db/inMemory/inMemoryPairRepository';
import { DisallowDuplicateParticipantInTPairDomainService } from '../../../../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { dummyPair1, dummyPair2 } from '../../../../testUtil/dummy/dummyPair';
import { dummyParticipant1, dummyParticipant5 } from '../../../../testUtil/dummy/dummyPerticipant';

describe('DisallowDuplicateParticipantDomainService', () => {
  const pairRepository = new InMemoryPairRepository();
  const service = new DisallowDuplicateParticipantInTPairDomainService(pairRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]ペアに所属していない参加者', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair1, dummyPair2]);
      // 結果確認
      await expect(service.do({ participant: dummyParticipant5 })).resolves.toBe(undefined);
      expect(spy1).toHaveBeenCalledTimes(1);
    });
    test('[異常]既にペアに所属しているのでエラーが発生', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair1, dummyPair2]);
      // 結果確認
      await expect(service.do({ participant: dummyParticipant1 })).rejects.toThrowError(
        'この参加者は既に他のペアに所属しています。',
      );
      expect(spy1).toHaveBeenCalledTimes(1);
    });
  });
});
