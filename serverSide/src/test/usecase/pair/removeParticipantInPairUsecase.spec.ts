import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { RemoveParticipantInPairUsecase } from '../../../usecase/pair/removeParticipantInPairUsecase';
import { DistributeOneParticipantForAnotherPairDomainService } from '../../../domain/pair/domainService/distributeOneParticipantDomainService';
import { dummyPair1, dummyPair3 } from '../../../testUtil/dummyPair';

describe('RemoveParticipantInPairUsecase', (): void => {
  const repo = new InMemoryPairRepository();
  const service = new DistributeOneParticipantForAnotherPairDomainService(repo);
  const usecase = new RemoveParticipantInPairUsecase(repo, service);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]2名のペアから1人減って、残ったペアが他のペアに振り分けられる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair1);
      const spy2 = jest
        .spyOn(DistributeOneParticipantForAnotherPairDomainService.prototype, 'do')
        .mockResolvedValueOnce(undefined);
      const data = { pairName: dummyPair3.pairName, removeParticipant: dummyPair3.participants[0] };
      // 結果確認
      await expect(usecase.do(data)).resolves.toStrictEqual(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
    test('[正常]3名のペアが2名になる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair3);
      const data = { pairName: dummyPair3.pairName, removeParticipant: dummyPair3.participants[0] };
      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

/*
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'findAll')
        .mockResolvedValueOnce([task1, task2]);

      // 結果確認
      expect(await usecase.do()).toStrictEqual([taskDTO1, taskDTO2]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
 */
