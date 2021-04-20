import { v4 as uuid } from 'uuid';

export const teamDataSource = () => {
  return [
    {
      teamId: uuid(),
      teamName: '1',
    },
    {
      teamId: uuid(),
      teamName: '2',
    },
    {
      teamId: uuid(),
      teamName: '3',
    },
    {
      teamId: uuid(),
      teamName: '4',
    },
  ];
};
