# やること
pairユースケース

### ユースケース
- findAll
  - 返り値: Pair
- findOne
  - 引数: PairName
  - 返り値: Pair
- create
  - 引数: participants[]
  - factory
    - 引数はparticipants[]
    - aからzまでの間で作成していない単語のペアをつくる
    - ペア名重複チェック
    - 参加者重複チェック
- ~~delete~~
- update
  - remove
    - 引数はペア名とparticipants[]
    - 1名のペアを他のペアに振り分けるドメインサービス
  - add  
    - 4名のペアを2つに分割するドメインサービス


### ドメインサービス
- ペア名重複チェックドメインサービス
- 4名のペアを2つに分割するドメインサービス
- 1名のペアを他のペアに振り分けるドメインサービス
  - ペア全件拾って、最小人数ペアを複数取得する
  - 進捗ステータス完了の数が同じくらいのペアを探す


```
import { InMemoryTaskRepository } from '../../../../infra/db/inMemory/inMemoryTaskRepository'
import { FindAllTaskUsecase } from '../../../../usecase/task/findAllTaskUsecase'


describe('FindAllTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new FindAllTaskUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]全件のデータが取得できる', async () => {
      // データ作成
      // 結果確認
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

```
