import {
  dummyId,
  dummyTeamData1,
  dummyTeamData3,
  dummyTeamDataBase,
  pair1,
  pair3,
  team1,
  team2,
  team3,
  teamLowerLimit,
} from '../../../../test-dummy/domain/participantDummyData';
import { Team } from '../../../../domain/participant/team/team';

describe('Team', (): void => {
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(team)', () => {
    expect(team1.id).toBe(dummyId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(team1.equals(team2)).toBe(true);
    });

    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(team1.equals(team3)).toBe(false);
    });
  });

  describe('コンストラクタ', () => {
    test('参加者が少なすぎる', () => {
      const data = {
        ...dummyTeamDataBase,
        pairs: [pair1],
      };
      expect(() => {
        Team.create(data);
      }).toThrowError(
        `チームに所属する参加者の人数が足りません。チームの下限は${teamLowerLimit}名です。`,
      );
    });
    test('参加者数が下限値(3)と同じ', () => {
      const data = {
        ...dummyTeamDataBase,
        pairs: [pair3],
      };
      const actual = Team.create(data);
      expect(actual.participantCount()).toStrictEqual(3);
    });

    describe('addPair', () => {
      test('チームをペアに追加する', () => {
        const actual = team1;
        actual.addPair(pair3);
        expect(actual.pairs.length).toBe(3);
      });
      test('チームに既にペアが存在するので(同じペアを新規のペアとして)ペアを追加できない', () => {
        const actual = Team.create(dummyTeamData1);
        const addPair = team1.pairs[0];
        expect(() => {
          actual.addPair(addPair);
        }).toThrowError('このペアは既にチームに存在します。');
      });
    });

    describe('removePair', () => {
      test('チームをペアから削除する', () => {
        const actual = Team.create(dummyTeamData3);
        const removedPair = actual.pairs[0];
        actual.removePair(removedPair);

        expect(actual.pairs.length).toBe(1);
      });
      test('ペアがチームに存在しないのでチームから削除できない', () => {
        const actual = Team.create(dummyTeamData3);
        expect(() => {
          actual.removePair(pair1);
        }).toThrowError('このペアはチームに存在しません。');
      });
    });
  });
});
