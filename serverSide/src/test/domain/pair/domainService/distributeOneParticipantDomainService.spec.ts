import { InMemoryPairRepository } from '../../../../infra/db/inMemory/inMemoryPairRepository';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../../../domain/pair/domainService/distributeOneParticipantDomainService';
import { dummyPair1, dummyPair2, dummyPair3 } from '../../../../testUtil/dummy/dummyPair';
import { dummyParticipant1, dummyParticipant5 } from '../../../../testUtil/dummy/dummyPerticipant';

describe('DistributeOneParticipantForAnotherPairDomainService', () => {
  const pairRepository = new InMemoryPairRepository();
  const service = new DistributeOneParticipantForAnotherPairDomainService(pairRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair3, dummyPair2]);
      const spy2 = jest
        .spyOn(InMemoryPairRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyPair1);
      const spy3 = jest.spyOn(InMemoryPairRepository.prototype, 'delete').mockResolvedValueOnce();
      const data = {
        pair: dummyPair1,
        shouldBeDistributedParticipant: dummyParticipant1,
      };
      // 結果確認
      await expect(service.do(data)).resolves.toBe(undefined);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
    });
    test('[異常]引数ペアの人数が3名', async () => {
      // データ作成
      const data = { pair: dummyPair3, shouldBeDistributedParticipant: dummyParticipant5 };
      // 結果確認
      await expect(service.do(data)).rejects.toThrowError('ペア数が2人ではありません');
    });
    test('[異常]他のペアに振り分けられるべき参加者がこのこのペアに参加していない', async () => {
      // データ作成
      const data = { pair: dummyPair1, shouldBeDistributedParticipant: dummyParticipant5 };
      // 結果確認
      await expect(service.do(data)).rejects.toThrowError(
        '他のペアに振り分けられるべき参加者がこのこのペアに参加していません',
      );
    });
    test('[異常]振り分けられるペアが存在しない', async () => {
      // データ作成
      const spy1 = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair3]);
      const data = {
        pair: dummyPair1,
        shouldBeDistributedParticipant: dummyParticipant1,
      };
      // 結果確認
      await expect(service.do(data)).rejects.toThrowError('振り分け先のペアが存在しません。');
      expect(spy1).toHaveBeenCalledTimes(1);
    });
  });
});
