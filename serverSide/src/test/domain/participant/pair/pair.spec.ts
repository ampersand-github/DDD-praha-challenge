import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { Pair } from '../../../../domain/participant/pair/pair';
import { Participant } from '../../../../domain/participant/participant/participant';
import { PairId } from '../../../../domain/participant/pair/pairId';
import { PairName } from '../../../../domain/participant/pair/pairName';

describe('Pair', (): void => {

  const uuid1 = new UniqueEntityID('c8b93182-3993-4543-8991-0be6dc9fe8d9');

  const p1 = {
    participantName: ParticipantName.create({ participantName: '山田太郎' }),
    mailAddress: MailAddress.create({ mailAddress: 'yamada@gmail.com' }),
  };
  const p2 = {
    participantName: ParticipantName.create({ participantName: '鈴木為三' }),
    mailAddress: MailAddress.create({ mailAddress: 'suzuki@gmail.com' }),
  };
  const p3 = {
    participantName: ParticipantName.create({ participantName: '近衛晴彦' }),
    mailAddress: MailAddress.create({ mailAddress: 'konoe@gmail.com' }),
  };
  const p4 = {
    participantName: ParticipantName.create({ participantName: '田中翔太' }),
    mailAddress: MailAddress.create({ mailAddress: 'tanaka@gmail.com' }),
  };
  //
  const upperLimit = 3;
  const lowerLimit = 2;
  //
  const participant1 = Participant.create(p1);
  const participant2 = Participant.create(p2);
  const participant3 = Participant.create(p3);
  const participant4 = Participant.create(p4);
  //
  const pairA = PairName.create({ pairName: 'a' });
  const pairB = PairName.create({ pairName: 'b' });
  //
  test('idを引数で指定して作成されたpairのidとその値(pairId)が取得できること', () => {
    const pair1 = {
      pairName: pairA,
      participants: [participant1, participant2],
      upperLimit: upperLimit,
      lowerLimit: lowerLimit,
    };
    const actual = Pair.create(pair1, uuid1);
    const except = PairId.create(uuid1);
    expect(actual.id).toStrictEqual(except);
  });
  test('pairIdで等価比較ができること', () => {
    const pair1 = {
      pairName: pairA,
      participants: [participant1, participant2],
      upperLimit: upperLimit,
      lowerLimit: lowerLimit,
    };
    const pair2 = {
      pairName: pairB,
      participants: [participant1, participant2, participant3],
      upperLimit: upperLimit,
      lowerLimit: lowerLimit,
    };

    const _pair1 = Pair.create(pair1, uuid1);
    const _pair2 = Pair.create(pair2, uuid1);
    expect(_pair1.equals(_pair2)).toStrictEqual(true);
  });
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
