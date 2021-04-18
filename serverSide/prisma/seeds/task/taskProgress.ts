import { v4 as uuid } from 'uuid';
export const taskProgressDataSource = (participantHavingTaskData) => {
  return [
    {
      taskProgressId: uuid(),
      participantHavingTaskId:
        participantHavingTaskData[0].participantHavingTaskId,
      progressStatus: '完了',
    },
  ];
};
