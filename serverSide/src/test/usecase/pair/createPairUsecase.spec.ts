import { InMemoryPairRepository } from '../../../infra/db/inMemory/inMemoryPairRepository';
import { CreatePairUsecase } from '../../../usecase/pair/createPairUsecase';
import { InMemoryParticipantRepository } from '../../../infra/db/inMemory/inMemoryParticipantRepository';
import { PairFactory } from '../../../domain/pair/domainService/pairFactory';
import { dummyParticipant1, dummyParticipant2 } from '../../../testUtil/dummyPerticipant';
import { dummyPair1 } from '../../../testUtil/dummyPair';
import { PairDTO } from '../../../usecase/pair/DTO/pairDTO';

describe('CreatePairUsecase', (): void => {
  const participantRepository = new InMemoryParticipantRepository();
  const pairRepository = new InMemoryPairRepository();
  const factory = new PairFactory(pairRepository);
  const usecase = new CreatePairUsecase(participantRepository, pairRepository, factory);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('do', (): void => {
    test('[正常]ペアを生成できる', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(dummyParticipant1)
        .mockResolvedValueOnce(dummyParticipant2);
      const spy2 = jest.spyOn(PairFactory.prototype, 'do').mockResolvedValueOnce(dummyPair1);
      const data = {
        participantIds: [dummyParticipant1.id.toValue(), dummyParticipant2.id.toValue()],
      };
      // 結果確認
      expect(await usecase.do(data)).toBeInstanceOf(PairDTO);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
    test('[異常]引数で渡されたidから参加者が取得できない', async () => {
      // データ作成
      const spy = jest
        .spyOn(InMemoryParticipantRepository.prototype, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(dummyParticipant2);
      const spy2 = jest.spyOn(PairFactory.prototype, 'do').mockResolvedValueOnce(dummyPair1);
      const data = {
        participantIds: [dummyParticipant1.id.toValue(), dummyParticipant2.id.toValue()],
      };
      // 結果確認
      expect(usecase.do(data)).rejects.toThrowError('参加者が存在しません。');
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy2).toHaveBeenCalledTimes(0);
    });
  });
});
