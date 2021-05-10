import { PairName } from '../../../../domain/participant/pair/pairName';

describe('PairName', (): void => {
  test('クラスが生成できること', () => {
    const data = { pairName: 'a' };
    const actual = PairName.create(data);
    expect(actual).toBeInstanceOf(PairName);
  });

  describe('コンストラクタ', () => {
    test('英小文字１字を入力', () => {
      const data = { pairName: 'a' };
      const actual = PairName.create(data);
      const except = data.pairName;
      expect(actual.pairName).toStrictEqual(except);
    });

    test('入力された値が小文字２字なので失敗する - ', () => {
      expect(() => {
        PairName.create({ pairName: 'aa' });
      }).toThrowError('入力された値が1字ではありません。');
    });

    test('入力された値が大文字１字なので失敗する', () => {
      expect(() => {
        PairName.create({ pairName: 'A' });
      }).toThrowError('入力された値が英小文字ではありません。');
    });
  });
});
