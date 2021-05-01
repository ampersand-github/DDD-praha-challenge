import { TeamName } from '../../../../domain/participant/Team/TeamName';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import { Participant } from '../../../../domain/participant/participant/participant';
import { PairName } from '../../../../domain/participant/pair/pairName';
import { Team } from '../../../../domain/participant/team/team';
import { Pair } from '../../../../domain/participant/pair/pair';
import { EnrolledStatus } from '../../../../domain/participant/participant/enrolledStatus';

describe('Team', (): void => {
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
  const participant5 = Participant.create({
    participantName: ParticipantName.create({ participantName: '坂本真彦' }),
    mailAddress: MailAddress.create({ mailAddress: 'sakamoto@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const participant6 = Participant.create({
    participantName: ParticipantName.create({ participantName: '山本一太' }),
    mailAddress: MailAddress.create({ mailAddress: 'yamamoto@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const participant7 = Participant.create({
    participantName: ParticipantName.create({ participantName: '小野寺雅士' }),
    mailAddress: MailAddress.create({ mailAddress: 'onodera@gmail.com' }),
    enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  });
  const pair1 = Pair.create({
    pairName: PairName.create({ pairName: 'a' }),
    participants: [participant1, participant2],
    upperLimit: 3,
    lowerLimit: 2,
  });
  const pair2 = Pair.create({
    pairName: PairName.create({ pairName: 'b' }),
    participants: [participant3, participant4],
    upperLimit: 3,
    lowerLimit: 2,
  });
  const pair3 = Pair.create({
    pairName: PairName.create({ pairName: 'c' }),
    participants: [participant5, participant6, participant7],
    upperLimit: 3,
    lowerLimit: 2,
  });
  const team = {
    teamName: TeamName.create({ teamName: 1 }),
    pairs: [pair1, pair2],
    upperLimit: 99,
    lowerLimit: 3,
  };
  test('idが取得できる', () => {
    const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = Team.create(team, uuid);
    expect(actual.id).toStrictEqual(uuid);
  });

  describe('コンストラクタ', () => {
    test('参加者数を取得できる', () => {
      const actual = Team.create(team);
      expect(actual.participantCount()).toStrictEqual(4);
    });
    test('参加者が少なすぎる', () => {
      const data = {
        ...team,
        pairs: [pair1],
      };
      expect(() => {
        Team.create(data);
      }).toThrow();
    });
    test('参加者数が下限値(3)と同じ', () => {
      const data = {
        ...team,
        pairs: [pair3],
      };
      const actual = Team.create(data);
      expect(actual.participantCount()).toStrictEqual(3);
    });

    describe('exists', () => {
      test('ペアが重複しない', () => {
        const actual = Team.create(team);
        expect(actual.exists(pair3)).toBe(false);
      });
      test('ペアが重複する', () => {
        const actual = Team.create(team);
        expect(actual.exists(pair2)).toBe(true);
      });
    });

    describe('addPair', () => {
      test('チームをペアに追加する', () => {
        const _ = Team.create(team);
        const actual = _.addPair(pair3);
        expect(actual.props.pairs.length).toBe(3);
      });
      test('チームに既にペアが存在するので(同じペアを新規のペアとして)ペアを追加できない', () => {
        const actual = Team.create(team);
        expect(() => {
          actual.removePair(pair3);
        }).toThrow();
      });
    });

    describe('removePair', () => {
      test('チームをペアから削除する', () => {
        const _team = Team.create({
          ...team,
          pairs: [pair1, pair2, pair3],
        });
        const actual = _team.removePair(pair1);
        expect(actual.props.pairs.length).toBe(2);
      });
      test('ペアがチームに存在しないのでチームから削除できない', () => {
        const actual = Team.create(team);
        expect(() => {
          actual.removePair(pair3);
        }).toThrow();
      });
    });
  });
});
