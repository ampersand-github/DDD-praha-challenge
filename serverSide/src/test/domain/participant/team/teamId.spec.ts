import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { TeamId } from '../../../../domain/participant/Team/TeamId';

describe('TeamId', (): void => {

  test('引数で指定したidがクラスのidになっていること', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    expect(TeamId.create(uuid).id).toBe(uuid);
  });
  test('同じidなら等価にこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = TeamId.create(uuid);
    const except = TeamId.create(uuid);
    expect(actual.equals(except)).toBe(true);
  });
  test('異なるIDでは等価にならないこと', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = TeamId.create(uuid);
    const uuid2 = new UniqueEntityID('99999999-9999-9999-9999-999999999998');
    const except = TeamId.create(uuid2);
    expect(actual.equals(except)).toBe(false);
  });
});
