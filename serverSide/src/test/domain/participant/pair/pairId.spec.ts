import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { PairId } from '../../../../domain/participant/pair/pairId';

describe('PairId', (): void => {

  test('引数で指定したidがクラスのidになっていること', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    expect(PairId.create(uuid).id).toBe(uuid);
  });
  test('同じidなら等価にこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = PairId.create(uuid);
    const except = PairId.create(uuid);
    expect(actual.equals(except)).toBe(true);
  });
  test('異なるIDでは等価にならないこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = PairId.create(uuid);
    const uuid2 = new UniqueEntityID('99999999-9999-9999-9999-999999999998');
    const except = PairId.create(uuid2);
    expect(actual.equals(except)).toBe(false);
  });
});
