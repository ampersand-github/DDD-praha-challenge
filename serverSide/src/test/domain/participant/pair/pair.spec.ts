import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { Pair } from '../../../../domain/participant/pair/pair';
import { Participant } from '../../../../domain/participant/participant/participant';
import { PairName } from '../../../../domain/participant/pair/pairName';
import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../../domain/participant/participant/enrolledStatus';
import {
  dummyData1,
  dummyData2,
  dummyId,
  dummyPairData1,
  dummyPairData3,
  pair1,
  pair2,
  pair3,
  participant1,
  participant2,
  participant3,
  participant4,
  participant7,
} from '../../dummyData/dummyData';

describe('Pair', (): void => {
  test('idを指定してクラスを作成し、そのクラスのidを取得できること(pair)', () => {
    expect(pair1.id).toBe(dummyId);
  });

  describe('equals', () => {
    test('等価比較ができること', () => {
      expect(pair1.equals(pair2)).toBe(true);
    });

    test('異なるidによる等価比較で等価と判定されないこと', () => {
      expect(pair1.equals(pair3)).toBe(false);
    });
  });

  describe('コンストラクタ', () => {
    test('ペア所属人数が足りないので例外が発生すること', () => {
      // 1人しか参加者がいない
      const onlyOnePair = {
        ...dummyPairData1,
        participants: [participant1],
      };
      expect(() => {
        Pair.create(onlyOnePair);
      }).toThrow();
    });

    test('ペア所属人数が多すぎる例外が発生すること ', () => {
      // 4人も参加者がいる]
      const fourPair = {
        ...dummyPairData1,
        participants: [participant1, participant2, participant3, participant4],
      };
      expect(() => {
        Pair.create(fourPair);
      }).toThrow();
    });
  });

  describe('addParticipant', () => {
    test('参加者を追加できる', () => {
      const actual = pair1;
      actual.addParticipant(participant3);
      expect(actual.participantCount()).toBe(3);
    });
    test('ペアに既に存在する参加者を参加させると二重参加になるので失敗する', () => {
      const actual = pair1;
      const newParticipant = actual.participants[0];
      expect(() => {
        actual.addParticipant(newParticipant);
      }).toThrow();
    });
  });

  describe('removeParticipant', () => {
    test('参加者をペアから追放できる', () => {
      const actual = pair3;
      const removedParticipant = actual.participants[0];
      actual.removeParticipant(removedParticipant);
      expect(actual.participantCount()).toBe(2);
    });
    test('存在しない参加者をペアから追放できない', () => {
      expect(() => {
        pair1.removeParticipant(participant7);
      }).toThrow();
    });
    test('追放すると参加者下限を下回る', () => {
      const actual = pair1;
      const removedParticipant = actual.participants[0];
      expect(() => {
        actual.removeParticipant(removedParticipant);
      }).toThrow();
    });
  });
});
