import { InMemoryPairRepository } from '../../../../infra/db/inMemory/inMemoryPairRepository';
import { PairFactory } from '../../../../domain/pair/domainService/pairFactory';
import { dummyPair1, dummyPair2 } from '../../../../testUtil/dummy/dummyPair';
import { dummyParticipant5, dummyParticipant6 } from '../../../../testUtil/dummy/dummyPerticipant';
import { Pair } from '../../../../domain/pair/pair';

describe('PairFactory', () => {
  const pairRepository = new InMemoryPairRepository();
  const service = new PairFactory(pairRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]ペアが作成できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair2, dummyPair1]);
      // 結果確認
      const result = await service.do({ participants: [dummyParticipant5, dummyParticipant6] });
      expect(result.pairName).toBe('c'); // ペアa,bが存在するので、新規ペアはcになる
      expect(result).toBeInstanceOf(Pair);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[正常]ペアが１件も存在しない場合、最初のペア名はaになる', async () => {
      // データ作成
      const spy = jest.spyOn(InMemoryPairRepository.prototype, 'findAll').mockResolvedValueOnce([]);
      // 結果確認
      const result = await service.do({ participants: [dummyParticipant5, dummyParticipant6] });
      expect(result.pairName).toBe('a');
      expect(result).toBeInstanceOf(Pair);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    /*
    ペアの上限数が決まっていないので、想定し得るエラーだが、今回は考えないこととする
    test('[異常]26を超えるペアを作成する', async () => {});
   */
  });
});
