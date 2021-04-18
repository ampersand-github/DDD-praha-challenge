import { v4 as uuid } from 'uuid';
import * as faker from 'faker';

export const teamDataSource = (pairDataSource) => {
  return [
    {
      teamId: uuid(),
      teamName: '1',
      pairId: pairDataSource[0].pairId,
    },
  ];
};
