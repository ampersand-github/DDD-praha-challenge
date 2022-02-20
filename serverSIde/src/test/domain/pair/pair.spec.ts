import { Pair } from '../../../domain/pair/pair';
import {
  dummyPair1,
  dummyPair2,
  dummyPair3,
  dummyPairData1,
  dummyPairId,
  DummyPairLowerLimit,
  DummyPairUpperLimit,
} from '../../../testUtil/dummy/dummyPair';
import {
  dummyParticipant1,
  dummyParticipant2,
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant7,
} from '../../../testUtil/dummy/dummyPerticipant';

describe('Pair', (): void => {
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(pair)', () => {
    expect(dummyPair1.id).toBe(dummyPairId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(dummyPair1.equals(dummyPair2)).toBe(true);
    });
    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(dummyPair1.equals(dummyPair3)).toBe(false);
    });
    test('引数がなければfalseが返る', () => {
      expect(dummyPair1.equals()).toBe(false);
    });
  });

  describe('コンストラクタ', () => {
    test('ペア所属人数が足りないので例外が発生すること', () => {
      // 1人しか参加者がいない
      const onlyOnePair = {
        ...dummyPairData1,
        participants: [dummyParticipant1],
      };
      expect(() => {
        Pair.create(onlyOnePair);
      }).toThrowError(
        `ペアに所属する参加者の人数が足りません。ペアの下限は${DummyPairLowerLimit}名です。`,
      );
    });

    test('ペア所属人数が多すぎる例外が発生すること ', () => {
      // 4人も参加者がいる
      const fourPair = {
        ...dummyPairData1,
        participants: [dummyParticipant1, dummyParticipant2, dummyParticipant3, dummyParticipant4],
      };
      expect(() => {
        Pair.create(fourPair);
      }).toThrowError(
        `ペアに所属する参加者の人数が多すぎます。ペアの上限は${DummyPairUpperLimit}名です。`,
      );
    });
  });

  describe('addParticipant', () => {
    test('参加者を追加できる', () => {
      const actual = dummyPair1;
      actual.addParticipant(dummyParticipant3);
      expect(actual.participantCount()).toBe(3);
    });
    test('ペアに既に存在する参加者を参加させると二重参加になるので失敗する', () => {
      const actual = dummyPair1;
      const newParticipant = actual.participants[0];
      expect(() => {
        actual.addParticipant(newParticipant);
      }).toThrowError('この参加者は既にペアに所属しています。');
    });
  });

  describe('removeParticipant', () => {
    test('参加者をペアから追放できる', () => {
      const actual = dummyPair3;
      const removedParticipant = actual.participants[0];
      actual.removeParticipant(removedParticipant);
      expect(actual.participantCount()).toBe(2);
    });
    test('存在しない参加者をペアから追放できない', () => {
      expect(() => {
        dummyPair1.removeParticipant(dummyParticipant7);
      }).toThrowError('この参加者は存在しません。');
    });
    test('追放すると参加者下限を下回る', () => {
      const actual = dummyPair1;
      const removedParticipant = actual.participants[0];
      expect(() => {
        actual.removeParticipant(removedParticipant);
      }).toThrowError(
        `ペアに所属する参加者の人数が足りません。ペアの下限は${DummyPairLowerLimit}名です。`,
      );
    });
  });
});
