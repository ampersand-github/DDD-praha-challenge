import { dummyPair1 } from '../../../../testUtil/dummy/dummyPair';
import { PairDTO } from '../../../../usecase/pair/DTO/pairDTO';

describe('PairDTO', (): void => {
  describe('do', (): void => {
    test('[正常]DTO生成できる', async () => {
      // データ作成
      const pairDTO = new PairDTO(dummyPair1);
      // 結果確認
      expect(pairDTO).toBeInstanceOf(PairDTO);
    });
  });
});
