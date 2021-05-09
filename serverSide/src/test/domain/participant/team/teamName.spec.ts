import { TeamName } from '../../../../domain/participant/Team/TeamName';

describe('TeamName', (): void => {
  test('チームネームが取得できる', () => {
    const actual = TeamName.create({ teamName: 1 });
    const except = 1;
    expect(actual.teamName).toStrictEqual(except);
  });
});
