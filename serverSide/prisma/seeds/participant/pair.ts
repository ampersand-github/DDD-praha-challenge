import { v4 as uuid } from 'uuid';

export const pairDataSource = (teamData) => {
  return [
    {
      pairId: uuid(),
      pairName: 'A',
      teamId: teamData[0].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'B',
      teamId: teamData[0].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'C',
      teamId: teamData[0].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'A',
      teamId: teamData[1].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'B',
      teamId: teamData[1].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'A',
      teamId: teamData[2].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'B',
      teamId: teamData[2].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'A',
      teamId: teamData[3].teamId,
    },
    {
      pairId: uuid(),
      pairName: 'B',
      teamId: teamData[3].teamId,
    },
  ];
};
