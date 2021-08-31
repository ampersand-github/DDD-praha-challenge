import axios from 'axios';
import { TaskRepository } from '../../infra/db/repository/taskRepository';
import { prismaClient } from '../../util/prisma/prismaClient';
import { truncateAllTable } from '../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../testUtil/dummy/dummyTask';
import { FactoryProps } from '../../usecase/participant/createParticipantUsecase';
import { ParticipantRepository } from '../../infra/db/repository/participantRepository';
import { dummyParticipant1, dummyParticipant10 } from '../../testUtil/dummy/dummyPerticipant';
import { EnrolledStatusEnum } from '../../domain/participant/enrolledStatus';
import { ToTaskConverter } from '../../infra/db/repository/shared/converter/ToTaskConverter';
import { ToHavingTaskCollectionConverter } from '../../infra/db/repository/shared/converter/ToHavingTaskCollectionConverter';
import { ToParticipantConverter } from '../../infra/db/repository/shared/converter/ToParticipantConverter';

// コントローラのテストはhttpステータスの確認のみ。実質ユースケースを実行しているだけなので。
describe('ParticipantController', () => {
  const url = 'http://localhost:3000/participant';
  const toTaskConverter = new ToTaskConverter();
  const toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(toTaskConverter);
  const toParticipantConverter = new ToParticipantConverter(
    toTaskConverter,
    toHavingTaskCollectionConverter,
  );
  const taskRepository = new TaskRepository(prismaClient, toTaskConverter);
  const participantRepository = new ParticipantRepository(
    prismaClient,
    toTaskConverter,
    toParticipantConverter,
    toHavingTaskCollectionConverter,
  );

  beforeAll(async () => {
    await truncateAllTable();
    // dockerを起動する
    // npm run start:devを起動する
  });

  beforeEach(async () => {
    await prismaClient.personalInfo.deleteMany();
    await prismaClient.participantHavingTask.deleteMany();
    await prismaClient.task.deleteMany();
    await prismaClient.participant.deleteMany();
    await taskRepository.create(dummyTask1);
    await taskRepository.create(dummyTask2);
    await taskRepository.create(dummyTask3);
    await participantRepository.create(dummyParticipant1);
    await participantRepository.create(dummyParticipant10);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('create', () => {
    it('[正常]作成できる', async () => {
      const data: FactoryProps = {
        participantName: '弥生恵',
        mailAddress: 'yayoi@gmail.com',
      };
      const res = await axios.post(url, data);
      expect(res.status).toEqual(201);
    });
  });

  describe('findAll', () => {
    it('[正常]全件取得できる', async () => {
      const res = await axios.get(url);
      expect(res.status).toEqual(200);
      expect(res.data.length).toEqual(2);
    });
  });

  describe('delete', () => {
    it('[正常]削除できる', async () => {
      expect(await prismaClient.participant.count()).toEqual(2);
      const id = dummyParticipant1.id.toValue();
      const res = await axios.delete(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(await prismaClient.participant.count()).toEqual(1);
    });
  });

  describe('update', () => {
    const findEnrolledStatus = async (id: string): Promise<string> => {
      const result = await prismaClient.participant.findUnique({
        where: { participantId: id },
      });
      return result.enrolledParticipant;
    };
    it('[正常]退会中 -> 参加中に更新できる', async () => {
      const id = dummyParticipant10.id.toValue();
      expect(await findEnrolledStatus(id)).toEqual(EnrolledStatusEnum.withdrawal);
      const enrolled = EnrolledStatusEnum.enrolled;
      const data = { status: enrolled };
      const res = await axios.patch(`${url}/${id}`, data);
      expect(res.status).toEqual(200);
      expect(await findEnrolledStatus(id)).toEqual(enrolled);
    });
    it('[正常]参加中 -> 休止中に更新できる', async () => {
      const id = dummyParticipant1.id.toValue();
      expect(await findEnrolledStatus(id)).toEqual(EnrolledStatusEnum.enrolled);
      const enrolled = EnrolledStatusEnum.recess;
      const data = { status: enrolled };
      const res = await axios.patch(`${url}/${id}`, data);
      expect(res.status).toEqual(200);
      expect(await findEnrolledStatus(id)).toEqual(enrolled);
    });
    it('[正常]参加中 -> 退会中に更新できる', async () => {
      const id = dummyParticipant1.id.toValue();
      expect(await findEnrolledStatus(id)).toEqual(EnrolledStatusEnum.enrolled);
      const enrolled = EnrolledStatusEnum.withdrawal;
      const data = { status: enrolled };
      const res = await axios.patch(`${url}/${id}`, data);
      expect(res.status).toEqual(200);
      expect(await findEnrolledStatus(id)).toEqual(enrolled);
    });
  });
});
