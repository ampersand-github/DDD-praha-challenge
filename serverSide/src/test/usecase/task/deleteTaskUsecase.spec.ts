import { DeleteTaskUsecase } from '../../../usecase/task/deleteTaskUsecase';
import { InMemoryTaskRepository } from '../../../infra/db/inMemory/inMemoryTaskRepository';
import { UniqueEntityID } from '../../../domain/shared/UniqueEntityID';

describe('DeleteTaskUsecase', (): void => {
  const repo = new InMemoryTaskRepository();
  const usecase = new DeleteTaskUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('delete', (): void => {
    test('[正常]削除できる', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'delete')
        .mockResolvedValueOnce(1);

      // 結果確認
      expect(await usecase.do(data)).toStrictEqual(1);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('[正常]リポジトリからERRORクラスが返る', async () => {
      // データ作成
      const expected = new Error('error');
      const data = { id: new UniqueEntityID().toValue() };
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'delete')
        .mockResolvedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskRepository.prototype, 'delete')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
