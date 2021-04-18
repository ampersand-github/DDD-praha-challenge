// prisma db seed --preview-feature
// prisma migrate reset
// https://www.prisma.io/docs/guides/application-lifecycle/seed-database

import { Prisma, PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import { participantDataSource } from './seeds/participant/participant';
import { pairDataSource } from './seeds/participant/pair';
import { teamDataSource } from './seeds/participant/team';
import { generationDataSource } from './seeds/participant/generation';
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
  const participantUpperLimitInPair = await prisma.participantUpperLimitInPair.create(
    {
      data: { upperLimit: 3 },
    },
  );

  const participantUpperLimitInTeam = await prisma.participantUpperLimitInTeam.create(
    {
      data: { upperLimit: 99 },
    },
  );

  const participantLowerLimitInPair = await prisma.participantLowerLimitInPair.create(
    {
      data: { lowerLimit: 2 },
    },
  );

  const participantLowerLimitInTeam = await prisma.participantLowerLimitInTeam.create(
    {
      data: { lowerLimit: 3 },
    },
  );

  const progressStatus = await prisma.progressStatus.createMany({
    data: [
      { progressStatus: '完了' },
      { progressStatus: 'レビュー欄' },
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

  const taskGroup = await prisma.taskGroup.createMany({
    data: [
      { taskGroupName: 'WEBの基礎' },
      { taskGroupName: 'テスト' },
      { taskGroupName: 'DB' },
      { taskGroupName: '設計' },
    ],
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 参加者集約
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const participantData = participantDataSource();
  const pairData = pairDataSource(participantData);
  const teamData = teamDataSource(pairData);
  const generationData = generationDataSource(participantData);
  const enrolledParticipantData = enrolledParticipantDataSource(
    participantData,
  );
  //
  const participant = await prisma.participant.createMany({
    data: participantData,
  });
  const pair = await prisma.pair.createMany({ data: pairData });
  const team = await prisma.team.createMany({ data: teamData });
  const generation = await prisma.generation.createMany({
    data: generationData,
  });
  const enrolledParticipant = await prisma.enrolledParticipant.createMany({
    data: enrolledParticipantData,
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 課題集約
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const taskData = taskDataSource();
  const participantHavingTaskData = participantHavingTaskDataSource(
    taskData,
    participantData,
  );
  const taskProgressData = taskProgressDataSource(participantHavingTaskData);
  //
  const task = await prisma.task.createMany({ data: taskData });
  const participantHavingTask = await prisma.participantHavingTask.createMany({
    data: participantHavingTaskData,
  });
  const taskProgress = await prisma.taskProgress.createMany({
    data: taskProgressData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
