import { Team } from '../../../domain/team/team';
import {
  dummyTeam1,
  dummyTeam2,
  dummyTeam3,
  dummyTeamDataBase,
  dummyTeamId,
  dummyTeamLowerLimit,
} from '../../../testUtil/dummy/dummyTeam';
import { dummyPair1, dummyPair3 } from '../../../testUtil/dummy/dummyPair';

describe('Team', (): void => {
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(team)', () => {
    expect(dummyTeam1.id).toBe(dummyTeamId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(dummyTeam1.equals(dummyTeam2)).toBe(true);
    });

    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(dummyTeam1.equals(dummyTeam3)).toBe(false);
    });
  });

  describe('コンストラクタ', () => {
    test('参加者が少なすぎる', () => {
      const data = {
        ...dummyTeamDataBase,
        pairs: [dummyPair1],
      };
      expect(() => {
        Team.create(data);
      }).toThrowError(
        `チームに所属する参加者の人数が足りません。チームの下限は${dummyTeamLowerLimit}名です。`,
      );
    });
    test('参加者数が下限値(3)と同じ', () => {
      const data = {
        ...dummyTeamDataBase,
        pairs: [dummyPair3],
      };
      const actual = Team.create(data);
      expect(actual.participantCount()).toStrictEqual(3);
    });

    describe('addPair', () => {
      test('チームをペアに追加する', () => {
        const actual = dummyTeam1;
        actual.addPair(dummyPair3);
        expect(actual.pairs.length).toBe(3);
      });
      test('チームに既にペアが存在するので(同じペアを新規のペアとして)ペアを追加できない', () => {
        const actual = dummyTeam1;
        const addPair = dummyTeam1.pairs[0];
        expect(() => {
          actual.addPair(addPair);
        }).toThrowError('このペアは既にチームに存在します。');
      });
    });

    describe('removePair', () => {
      test('チームをペアから削除する', () => {
        const actual = dummyTeam3;
        const removedPair = actual.pairs[0];
        actual.removePair(removedPair);

        expect(actual.pairs.length).toBe(1);
      });
      test('ペアがチームに存在しないのでチームから削除できない', () => {
        const actual = dummyTeam3;
        expect(() => {
          actual.removePair(dummyPair1);
        }).toThrowError('このペアはチームに存在しません。');
      });
    });
  });
});
