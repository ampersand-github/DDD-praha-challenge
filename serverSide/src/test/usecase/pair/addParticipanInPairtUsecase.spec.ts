import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { DividePairDomainService } from '../../../domain/pair/domainService/dividePairDomainService';
import { DisallowDuplicateParticipantInTPairDomainService } from '../../../domain/pair/domainService/disallowDuplicateParticipantDomainService';
import { AddParticipantInPairUsecase } from '../../../usecase/pair/addParticipantInPairUsecase';
import { dummyPair1, dummyPair2, dummyPair3 } from '../../../testUtil/dummy/dummyPair';
import { dummyParticipant3, dummyParticipant5 } from '../../../testUtil/dummy/dummyPerticipant';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';

describe('AddParticipantInPairUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const pairRepository = new InMemoryPairRepository();
  const addService = new DisallowDuplicateParticipantInTPairDomainService(pairRepository);
  const divideService = new DividePairDomainService(pairRepository);
  const usecase = new AddParticipantInPairUsecase(
    participantRepository,
    pairRepository,
    addService,
    divideService,
  );

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
      const spy3 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant3);
      const data = {
        pairId: dummyPair1.id.toValue(),
        addParticipantId: dummyParticipant5.id.toValue(),
      };
      // 結果確認
      const result = await usecase.do(data);
      await expect(result.length).toStrictEqual(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
    });
    test('[正常]3名のペアに1名増えてペアが2つに分割される', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair3);
      const spy2 = jest.spyOn(divideService, 'do').mockResolvedValueOnce([dummyPair1, dummyPair2]);
      const spy3 = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair3.participants[0]);
      const data = {
        pairId: dummyPair1.id.toValue(),
        addParticipantId: dummyParticipant5.id.toValue(),
      };
      // 結果確認
      const result = await usecase.do(data);
      await expect(result.length).toStrictEqual(2);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(spy3).toHaveBeenCalledTimes(1);
    });
  });
});
