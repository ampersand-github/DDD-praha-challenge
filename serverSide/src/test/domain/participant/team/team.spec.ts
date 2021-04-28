import { TeamName } from '../../../../domain/participant/Team/TeamName';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { ParticipantName } from '../../../../domain/participant/participant/participantName';
import { MailAddress } from '../../../../domain/participant/participant/mailAddress';
import { Participant } from '../../../../domain/participant/participant/participant';
import { PairName } from '../../../../domain/participant/pair/pairName';
import { Team } from '../../../../domain/participant/team/team';
import { Pair } from '../../../../domain/participant/pair/pair';
import {TeamId} from "../../../../domain/participant/team/teamId";

describe('Team', (): void => {
  const participant1 = Participant.create({
    participantName: ParticipantName.create({ participantName: '山田太郎' }),
    mailAddress: MailAddress.create({ mailAddress: 'yamada@gmail.com' }),
  });
  const participant2 = Participant.create({
    participantName: ParticipantName.create({ participantName: '鈴木為三' }),
    mailAddress: MailAddress.create({ mailAddress: 'suzuki@gmail.com' }),
  });
  const participant3 = Participant.create({
    participantName: ParticipantName.create({ participantName: '近衛晴彦' }),
    mailAddress: MailAddress.create({ mailAddress: 'konoe@gmail.com' }),
  });

  const participant4 = Participant.create({
    participantName: ParticipantName.create({ participantName: '田中翔太' }),
    mailAddress: MailAddress.create({ mailAddress: 'tanaka@gmail.com' }),
  });

  const pair1 = Pair.create({
    pairName: PairName.create({ pairName: 'a' }),
    participants: [participant1, participant2],
    upperLimit: 3,
    lowerLimit: 2,
  });
  const pair2 = Pair.create({
    pairName: PairName.create({ pairName: 'a' }),
    participants: [participant3, participant4],
    upperLimit: 3,
    lowerLimit: 2,
  });

  const team = {
    teamName: TeamName.create({ teamName: 1 }),
    pairs: [pair1, pair2],
    upperLimit: 99,
    lowerLimit: 2,
  };

  test('idが取得できる', () => {
      const uuid = new UniqueEntityID('99999999-9999-9999-9999-999999999999');
    const actual = Team.create(team,uuid);
      const teamId = TeamId.create(uuid)
    expect(actual.id).toStrictEqual(teamId);
  });
});
