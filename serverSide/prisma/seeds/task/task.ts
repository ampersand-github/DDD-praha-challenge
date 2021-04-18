import { v4 as uuid } from 'uuid';
export const taskDataSource = () => {
  return [
    {
      taskId: uuid(),
      taskNo: 1,
      taskName: 'その１',
      description: '説明１',
      taskGroupName: 'WEBの基礎',
    },
  ];
};
