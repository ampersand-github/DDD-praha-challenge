import { InMemoryTaskGroupRepository } from '../../../infra/db/inMemory/inMemoryTaskGroupRepository';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DeleteTaskGroupUsecase } from '../../../usecase/taskGroup/DeleteTaskGroupUsecase';

describe('DeleteTaskGroupUsecase', (): void => {
  const repo = new InMemoryTaskGroupRepository();
  const usecase = new DeleteTaskGroupUsecase(repo);

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('delete', (): void => {
    test('[正常]削除できる', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'delete')
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
        .spyOn(InMemoryTaskGroupRepository.prototype, 'delete')
        .mockResolvedValueOnce(expected);

      // 結果確認
      await expect(async () => {
        await usecase.do(data);
      }).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('[異常]', async () => {
      // データ作成
      const data = { id: new UniqueEntityID().toValue() };
      const expected = new Error('error');
      const spy = jest
        .spyOn(InMemoryTaskGroupRepository.prototype, 'delete')
        .mockRejectedValueOnce(expected);

      // 結果確認
      await expect(usecase.do(data)).rejects.toThrowError(expected);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
