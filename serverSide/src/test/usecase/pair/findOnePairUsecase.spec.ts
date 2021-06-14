import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { AddParticipantInPairUsecase } from '../../../usecase/pair/addParticipantInPairUsecase';
import { CreatePairUsecase } from '../../../usecase/pair/createPairUsecase';
import { FindAllUsecase } from '../../../usecase/pair/findAllPairUsecase';
import { FindOnePairUsecase } from '../../../usecase/pair/findOnePairUsecase';
import { dummyPair1 } from '../../../testUtil/dummyPair';
import { PairDTO } from '../../../usecase/pair/DTO/pairDTO';

describe('FindOnePairUsecase', (): void => {
  const repo = new InMemoryPairRepository();
  const usecase = new FindOnePairUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]データが取得できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyPair1);
      const expected = new PairDTO(dummyPair1);
      const data = { pairName: 'a' };
      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
