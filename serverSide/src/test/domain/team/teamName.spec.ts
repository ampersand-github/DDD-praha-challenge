import { TeamName } from '../../../domain/team/teamName';

describe('TeamName', (): void => {
  test('クラスが生成できること', () => {
    const actual = TeamName.create({ teamName: 1 });
    expect(actual).toBeInstanceOf(TeamName);
  });

  test('チームネームが取得できる', () => {
    const actual = TeamName.create({ teamName: 1 });
    const except = 1;
    expect(actual.teamName).toStrictEqual(except);
  });
});
