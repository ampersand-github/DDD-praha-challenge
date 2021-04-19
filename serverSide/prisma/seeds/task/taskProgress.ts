import { v4 as uuid } from 'uuid';
export const taskProgressDataSource = (participantHavingTaskData) => {
  return [
    {
      taskProgressId: uuid(),
      participantHavingTaskId:
        participantHavingTaskData[0].participantHavingTaskId,
      progressStatus: '完了',
    },
    {
      taskProgressId: uuid(),
      participantHavingTaskId:
        participantHavingTaskData[1].participantHavingTaskId,
      progressStatus: '完了',
    },
    {
      taskProgressId: uuid(),
      participantHavingTaskId:
        participantHavingTaskData[2].participantHavingTaskId,
      progressStatus: 'レビュー待ち',
    },
    {
      taskProgressId: uuid(),
      participantHavingTaskId:
        participantHavingTaskData[3].participantHavingTaskId,
      progressStatus: '未着手',
    },
  ];
};
