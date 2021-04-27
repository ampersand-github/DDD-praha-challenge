import { PairName } from '../../../../domain/participant/pair/pairName';
import { MailAddress } from '../../../../domain/participant/participant/mailAddress';

describe('PairName', (): void => {
  test('good pattern', () => {
    const good = { pairName: 'a' };
    const actual = PairName.create(good).value;
    const except = good.pairName;
    expect(actual).toStrictEqual(except);
  });

  test('good pattern - 入力された値が小文字２字 - ', () => {
    const bad2 = { pairName: 'aa' };
    expect(() => {
      PairName.create(bad2);
    }).toThrow();
  });

  test('good pattern - 入力された値が大文字１字 - ', () => {
    const bad = { pairName: 'A' };
    expect(() => {
      PairName.create(bad);
    }).toThrow();
  });
});
