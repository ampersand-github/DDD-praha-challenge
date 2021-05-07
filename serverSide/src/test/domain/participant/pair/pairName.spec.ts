import { PairName } from '../../../../domain/participant/pair/pairName';

describe('PairName', (): void => {
  test('英小文字１字を入力', () => {
    const data = { pairName: 'a' };
    const actual = PairName.create(data);
    const except = data.pairName;
    expect(actual.pairName).toStrictEqual(except);
  });

  test('入力された値が小文字２字なので失敗する - ', () => {
    expect(() => {
      PairName.create({ pairName: 'aa' });
    }).toThrow();
  });

  test('入力された値が大文字１字なので失敗する', () => {
    expect(() => {
      PairName.create({ pairName: 'A' });
    }).toThrow();
  });
});
