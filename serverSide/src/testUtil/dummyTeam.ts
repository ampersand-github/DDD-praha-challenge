import { TeamName } from '../domain/team/teamName';
import { Team } from '../domain/team/team';
import { dummyPair1, dummyPair2, dummyPair3 } from './dummyPair';
import { UniqueEntityID } from '../domain/shared/UniqueEntityID';

const dummyTeamUpperLimit = 99;
export const dummyTeamLowerLimit = 3;
const dummyTeamName1 = TeamName.create({ teamName: 1 });
const dummyTeamName2 = TeamName.create({ teamName: 2 });
const dummyTeamName3 = TeamName.create({ teamName: 3 });
export const dummyTeamDataBase = {
  teamName: dummyTeamName1,
  pairs: [],
  upperLimit: dummyTeamUpperLimit,
  lowerLimit: dummyTeamLowerLimit,
};

const dummyTeamData1 = {
  ...dummyTeamDataBase,
  teamName: dummyTeamName1,
  pairs: [dummyPair1, dummyPair2],
};
const dummyTeamData2 = {
  ...dummyTeamDataBase,
  teamName: dummyTeamName2,
  pairs: [dummyPair3],
};
const dummyTeamData3 = {
  ...dummyTeamDataBase,
  teamName: dummyTeamName3,
  pairs: [dummyPair1, dummyPair2, dummyPair3],
};

export const dummyTeamId = new UniqueEntityID(
  '99999999-9999-team-9999-99999999999s',
);

export const dummyTeam1 = Team.create(dummyTeamData1, dummyTeamId);
export const dummyTeam2 = Team.create(dummyTeamData2, dummyTeamId);
export const dummyTeam3 = Team.create(dummyTeamData3);
export const dummyTeam4 = Team.create(dummyTeamData3);
