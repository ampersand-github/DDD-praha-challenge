// prisma db seed --preview-feature
// prisma migrate reset
// https://www.prisma.io/docs/guides/application-lifecycle/seed-database

import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';
import { participantDataSource } from './seeds/participant/participant';
import { pairDataSource } from './seeds/participant/pair';
import { teamDataSource } from './seeds/participant/team';
import { enrolledParticipantDataSource } from './seeds/participant/enrolledParticipant';
import { taskDataSource } from './seeds/task/task';
import { participantHavingTaskDataSource } from './seeds/task/participantHavingTask';
import { taskProgressDataSource } from './seeds/task/taskProgress';

const prisma = new PrismaClient();
faker.setLocale('ja');

async function main() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 設定系データ
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const progressStatus = await prisma.progressStatus.createMany({
    data: [
      { progressStatus: '完了' },
      { progressStatus: 'レビュー待ち' },
      { progressStatus: '未着手' },
    ],
  });

  const enrolledStatus = await prisma.enrolledStatus.createMany({
    data: [
      { enrolledStatus: '在籍中' },
      { enrolledStatus: '休会中' },
      { enrolledStatus: '退会済' },
    ],
  });

  console.log(progressStatus, enrolledStatus);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 参加者集約
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const teamData = teamDataSource();
  const pairData = pairDataSource(teamData);
  const participantData = participantDataSource(pairData);

  const enrolledParticipantData = enrolledParticipantDataSource(participantData);
  //
  const team = await prisma.team.createMany({ data: teamData });
  const pair = await prisma.pair.createMany({ data: pairData });
  const participant = await prisma.participant.createMany({
    data: participantData,
  });
  const enrolledParticipant = await prisma.enrolledParticipant.createMany({
    data: enrolledParticipantData,
  });

  console.log(team, pair, participant, enrolledParticipant);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 課題集約
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const taskData = taskDataSource();
  const participantHavingTaskData = participantHavingTaskDataSource(taskData, participantData);
  const taskProgressData = taskProgressDataSource(participantHavingTaskData);
  //
  const task = await prisma.task.createMany({ data: taskData });
  const participantHavingTask = await prisma.participantHavingTask.createMany({
    data: participantHavingTaskData,
  });
  const taskProgress = await prisma.taskProgress.createMany({
    data: taskProgressData,
  });
  console.log(task, participantHavingTask, taskProgress);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
