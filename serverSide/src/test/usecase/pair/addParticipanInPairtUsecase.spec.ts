import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { DividePairDomainService } from '../../../domain/pair/domainService/dividePairDomainService';
import { DisallowDuplicateParticipantInTPairDomainService } from '../../../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { AddParticipantInPairUsecase } from '../../../usecase/pair/addParticipantInPairUsecase';
import { dummyPair1, dummyPair2, dummyPair3 } from '../../../testUtil/dummy/dummyPair';
import { dummyParticipant5 } from '../../../testUtil/dummy/dummyPerticipant';
import { PairDTO } from '../../../usecase/pair/DTO/pairDTO';

describe('AddParticipantInPairUsecase', (): void => {
  const repo = new InMemoryPairRepository();
  const addService = new DisallowDuplicateParticipantInTPairDomainService(repo);
  const divideService = new DividePairDomainService(repo);
  const usecase = new AddParticipantInPairUsecase(repo, addService, divideService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]2名のペアに1名増える', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair1);
      const spy2 = jest
        .spyOn(InMemoryPairRepository.prototype, 'update')
        .mockResolvedValueOnce(dummyPair1);
      const data = { pairName: 'a', addParticipant: dummyParticipant5 };
      // 結果確認
      const result = await usecase.do(data);
      await expect(result.length).toStrictEqual(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
    test('[正常]3名のペアに1名増えてペアが2つに分割される', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair3);
      const spy2 = jest.spyOn(divideService, 'do').mockResolvedValueOnce([dummyPair1, dummyPair2]);
      const data = { pairName: 'a', addParticipant: dummyParticipant5 };
      // 結果確認
      const result = await usecase.do(data);
      await expect(result.length).toStrictEqual(2);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
