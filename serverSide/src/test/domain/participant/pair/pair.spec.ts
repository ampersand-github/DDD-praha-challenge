import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { Pair } from '../../../../domain/participant/pair/pair';
import { Participant } from '../../../../domain/participant/participant/participant';
import { PairName } from '../../../../domain/participant/pair/pairName';
import { EnrolledStatus } from '../../../../domain/participant/participant/enrolledStatus';

describe('Pair', (): void => {
  const uuid1 = new UniqueEntityID('c8b93182-3993-4543-8991-0be6dc9fe8d9');

  const participant1 = Participant.create({
    participantName: ParticipantName.create({ participantName: '山田太郎' }),
    mailAddress: MailAddress.create({ mailAddress: 'yamada@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const participant2 = Participant.create({
    participantName: ParticipantName.create({ participantName: '鈴木為三' }),
    mailAddress: MailAddress.create({ mailAddress: 'suzuki@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const participant3 = Participant.create({
    participantName: ParticipantName.create({ participantName: '近衛晴彦' }),
    mailAddress: MailAddress.create({ mailAddress: 'konoe@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const participant4 = Participant.create({
    participantName: ParticipantName.create({ participantName: '田中翔太' }),
    mailAddress: MailAddress.create({ mailAddress: 'tanaka@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  //
  const upperLimit = 3;
  const lowerLimit = 2;
  //
  const pairA = PairName.create({ pairName: 'a' });
  const pairB = PairName.create({ pairName: 'b' });
  //
  const pairData = {
    pairName: pairA,
    participants: [participant1, participant2],
    upperLimit: upperLimit,
    lowerLimit: lowerLimit,
  };

  test('idを引数で指定して作成されたpairのidとその値(pairId)が取得できること', () => {
    const actual = Pair.create(pairData, uuid1);
    expect(actual.id).toStrictEqual(uuid1);
  });

  test('pairIdで等価比較ができること', () => {
    const pair2 = {
      ...pairData,
      participants: [participant1, participant2, participant3],
    };
    const _pair1 = Pair.create(pairData, uuid1);
    const _pair2 = Pair.create(pair2, uuid1);
    expect(_pair1.equals(_pair2)).toStrictEqual(true);
  });

  describe('コンストラクタ', () => {
    test('ペア所属人数が足りないので例外が発生すること', () => {
      // 1人しか参加者がいない
      const pair1_bad = {
        pairName: pairA,
        participants: [participant1],
        upperLimit: upperLimit,
        lowerLimit: lowerLimit,
      };

      expect(() => {
        Pair.create(pair1_bad);
      }).toThrow();
    });
    test('ペア所属人数が多すぎる例外が発生すること ', () => {
      // 4人も参加者がいる
      const pair2_bad = {
        pairName: pairB,
        participants: [participant1, participant2, participant3, participant4],
        upperLimit: upperLimit,
        lowerLimit: lowerLimit,
      };
      expect(() => {
        Pair.create(pair2_bad);
      }).toThrow();
    });
  });


  describe('canAdd', () => {
    test('参加者を追加できる', () => {
      const pair = Pair.create(pairData);
      const actual = pair.addParticipant(participant3);
      expect(actual.props.participants.length).toBe(3);

    });
    test('ペアに既に存在する参加者を参加させると二重参加になり失敗する', () => {
      const pair = Pair.create(pairData);
      expect(() => {
        pair.addParticipant(participant1);
      }).toThrow();
    });
  });

  describe('canRemove', () => {
    test('参加者をペアから追放する', () => {
      const pair = Pair.create({
        ...pairData,
        participants: [participant1, participant2, participant3],
      });
      const actual = pair.removeParticipant(participant1);
      expect(actual.props.participants.length).toBe(2);

    });
    test('存在しない参加者をペアから追放できない', () => {
      const pair = Pair.create({
        ...pairData,
        participants: [participant1, participant2, participant3],
      });

      expect(() => {
        pair.removeParticipant(participant4);
      }).toThrow();
    });
  });
});
