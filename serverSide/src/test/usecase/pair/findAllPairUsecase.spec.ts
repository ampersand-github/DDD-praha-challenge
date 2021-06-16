import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { FindAllUsecase } from '../../../usecase/pair/findAllPairUsecase';
import { dummyPair1, dummyPair2 } from '../../../testUtil/dummyPair';
import { PairDTO } from '../../../usecase/pair/DTO/pairDTO';

describe('FindAllUsecase', (): void => {
  const repo = new InMemoryPairRepository();
  const usecase = new FindAllUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryPairRepository.prototype, 'findAll')
        .mockResolvedValueOnce([dummyPair1, dummyPair2]);
      const expected = [new PairDTO(dummyPair1), new PairDTO(dummyPair2)];
      // 結果確認
      expect(await usecase.do()).toStrictEqual(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
