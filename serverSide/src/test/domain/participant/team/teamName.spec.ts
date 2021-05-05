import { TeamName } from '../../../../domain/participant/Team/TeamName';

describe('TeamName', (): void => {
  test('チームネームが取得できる', () => {
    const data = { teamName: 1 };
    const actual = TeamName.create(data);
    const except = data.teamName;
    expect(actual.values.teamName).toStrictEqual(except);
  });
});
