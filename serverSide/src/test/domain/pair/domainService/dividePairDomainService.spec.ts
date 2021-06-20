import { InMemoryPairRepository } from '../../../../infra/db/inMemory/inMemoryPairRepository';
import { DividePairDomainService } from '../../../../domain/pair/domainService/dividePairDomainService';
import { dummyPair1, dummyPair2, dummyPair3 } from '../../../../testUtil/dummyPair';
import { dummyParticipant1 } from '../../../../testUtil/dummyPerticipant';
import { PairFactory } from '../../../../domain/pair/domainService/pairFactory';

describe('DividePairDomainService', () => {
  const pairRepository = new InMemoryPairRepository();
  const service = new DividePairDomainService(pairRepository);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]4名のペアを2名×2のペアに分割する', async () => {
      // データ作成
      const spy1 = jest.spyOn(PairFactory.prototype, 'do').mockResolvedValueOnce(dummyPair1);
      const spy2 = jest
        .spyOn(InMemoryPairRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyPair1)
        .mockResolvedValueOnce(dummyPair2);

      const data = { pair: dummyPair3, addParticipant: dummyParticipant1 };
      // 結果確認
      const expected = [dummyPair1, dummyPair2];
      await expect(service.do(data)).resolves.toStrictEqual(expected);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(2);
    });
    test('[異常]', async () => {
      // データ作成
      const data = { pair: dummyPair3, addParticipant: dummyParticipant1 };
      // 結果確認
      await expect(service.do(data)).rejects.toThrowError(
        '引数で与えられたペアが3名ではありません',
      );
    });
  });
});
