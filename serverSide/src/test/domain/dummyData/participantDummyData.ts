import { Participant } from '../../../domain/participant/participant/participant';
import { ParticipantName } from '../../../domain/participant/personalInfo/participantName';
import { MailAddress } from '../../../domain/participant/personalInfo/mailAddress';
import {
  EnrolledStatus,
  EnrolledStatusEnum,
} from '../../../domain/participant/participant/enrolledStatus';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { PairName } from '../../../domain/participant/pair/pairName';
import { Pair } from '../../../domain/participant/pair/pair';
import { TeamName } from '../../../domain/participant/team/teamName';
import { Team } from '../../../domain/participant/team/team';
import { participantHavingTask1 } from './taskDummyData';
import { PersonalInfo } from '../../../domain/participant/personalInfo/personalInfo';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 共通
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const dummyId = new UniqueEntityID(
  '99999999-9999-9999-9999-99999999999s',
);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 個人情報
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const personalIfo1 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '山田太郎' }),
  mailAddress: MailAddress.create({ mailAddress: 'yamada@gmail.com' }),
});
const personalIfo2 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '鈴木為三' }),
  mailAddress: MailAddress.create({ mailAddress: 'suzuki@gmail.com' }),
});
const personalIfo3 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '近衛晴彦' }),
  mailAddress: MailAddress.create({ mailAddress: 'konoe@gmail.com' }),
});
const personalIfo4 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '田中翔太' }),
  mailAddress: MailAddress.create({ mailAddress: 'tanaka@gmail.com' }),
});
const personalIfo5 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '坂本真彦' }),
  mailAddress: MailAddress.create({ mailAddress: 'sakamoto@gmail.com' }),
});
const personalIfo6 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '山本一太' }),
  mailAddress: MailAddress.create({ mailAddress: 'yamamoto@gmail.com' }),
});
const personalIfo7 = PersonalInfo.create({
  participantName: ParticipantName.create({ participantName: '小野寺雅士' }),
  mailAddress: MailAddress.create({ mailAddress: 'onodera@gmail.com' }),
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 参加者
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const enrolled = EnrolledStatusEnum.enrolled;

const dummyData1 = {
  personalInfo: personalIfo1,
  enrolledStatus: EnrolledStatus.create({ enrolledStatus: enrolled }),
  participantHavingTask: participantHavingTask1,
};

const dummyData2 = {
  personalInfo: personalIfo2,
  enrolledStatus: EnrolledStatus.create({ enrolledStatus: enrolled }),
  participantHavingTask: participantHavingTask1,
};

const dummyData3 = {
  personalInfo: personalIfo3,
  enrolledStatus: EnrolledStatus.create({ enrolledStatus: enrolled }),
  participantHavingTask: participantHavingTask1,
};

const dummyData4 = {
  personalInfo: personalIfo4,
  enrolledStatus: EnrolledStatus.create({ enrolledStatus: enrolled }),
  participantHavingTask: participantHavingTask1,
};

const dummyData5 = {
  personalInfo: personalIfo5,

  enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  participantHavingTask: participantHavingTask1,
};
const dummyData6 = {
  personalInfo: personalIfo6,

  enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  participantHavingTask: participantHavingTask1,
};
const dummyData7 = {
  personalInfo: personalIfo7,

  enrolledStatus: EnrolledStatus.create({ enrolledStatus: '在籍中' }),
  participantHavingTask: participantHavingTask1,
};

export const participant1 = Participant.create(dummyData1, dummyId);
export const participant2 = Participant.create(dummyData2, dummyId); // idはランダムで割り振られる
export const participant3 = Participant.create(dummyData3);
export const participant4 = Participant.create(dummyData4);
export const participant5 = Participant.create(dummyData5);
export const participant6 = Participant.create(dummyData6);
export const participant7 = Participant.create(dummyData7);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ペア
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const pairUpperLimit = 3;
export const pairLowerLimit = 2;
const pairA = PairName.create({ pairName: 'a' });
const pairB = PairName.create({ pairName: 'b' });
const pairC = PairName.create({ pairName: 'c' });

const dummyPairDataBase = {
  pairName: pairA,
  participants: [],
  upperLimit: pairUpperLimit,
  lowerLimit: pairLowerLimit,
};

export const dummyPairData1 = {
  ...dummyPairDataBase,
  pairName: pairA,
  participants: [participant1, participant2],
};
export const dummyPairData2 = {
  ...dummyPairDataBase,
  pairName: pairB,
  participants: [participant3, participant4],
};
export const dummyPairData3 = {
  ...dummyPairDataBase,
  pairName: pairC,
  participants: [participant5, participant6, participant7],
};
export const pair1 = Pair.create(dummyPairData1, dummyId);
export const pair2 = Pair.create(dummyPairData2, dummyId);
export const pair3 = Pair.create(dummyPairData3); // idはランダムで割り振られる
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// チーム
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const teamUpperLimit = 99;
export const teamLowerLimit = 3;
const teamName1 = TeamName.create({ teamName: 1 });
const teamName2 = TeamName.create({ teamName: 2 });
const teamName3 = TeamName.create({ teamName: 3 });
export const dummyTeamDataBase = {
  teamName: teamName1,
  pairs: [],
  upperLimit: teamUpperLimit,
  lowerLimit: teamLowerLimit,
};

export const dummyTeamData1 = {
  ...dummyTeamDataBase,
  teamName: teamName1,
  pairs: [pair1, pair2],
};
export const dummyTeamData2 = {
  ...dummyTeamDataBase,
  teamName: teamName2,
  pairs: [pair3],
};
export const dummyTeamData3 = {
  ...dummyTeamDataBase,
  teamName: teamName3,
  pairs: [pair1, pair2, pair3],
};
export const team1 = Team.create(dummyTeamData1, dummyId);
export const team2 = Team.create(dummyTeamData2, dummyId);
export const team3 = Team.create(dummyTeamData2);
export const team4 = Team.create(dummyTeamData3);
