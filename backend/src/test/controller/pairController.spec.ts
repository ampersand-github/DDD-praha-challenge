import axios from 'axios';
import { TaskRepository } from "@/infra/db/repository/taskRepository";
import { prismaClient } from "@/util/prisma/prismaClient";
import { truncateAllTable } from "@/testUtil/reposiotry/truncateAllTable";
import { dummyTask1, dummyTask2, dummyTask3 } from "@/testUtil/dummy/dummyTask";
import {
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant5,
  dummyParticipant6,
  dummyParticipant7,
  dummyParticipant8,
  dummyParticipant9,
} from "@/testUtil/dummy/dummyPerticipant";
import { dummyPair2, dummyPair4 } from "@/testUtil/dummy/dummyPair";
import { ParticipantRepository } from "@/infra/db/repository/participantRepository";
import { PairRepository } from "@/infra/db/repository/pairRepository";
import { CreatePairUsecaseProps } from "@/usecase/pair/createPairUsecase";
import { ToTaskConverter } from "@/infra/db/repository/shared/converter/ToTaskConverter";
import { ToHavingTaskCollectionConverter } from "@/infra/db/repository/shared/converter/ToHavingTaskCollectionConverter";
import { ToParticipantConverter } from "@/infra/db/repository/shared/converter/ToParticipantConverter";
import { ToPairConverter } from "@/infra/db/repository/shared/converter/ToPairConverter";
require('dotenv').config();

// コントローラのテストはhttpステータスの確認のみ。実質ユースケースを実行しているだけなので。
describe('PairController', () => {
  const port = process.env.PORT
  const url = `http://localhost:${port}/pair`;
  const toTaskConverter = new ToTaskConverter();
  const toHavingTaskCollectionConverter = new ToHavingTaskCollectionConverter(toTaskConverter);
  const toParticipantConverter = new ToParticipantConverter(
    toTaskConverter,
    toHavingTaskCollectionConverter,
  );
  const toPairConverter = new ToPairConverter(
    toHavingTaskCollectionConverter,
    toParticipantConverter,
  );
  const taskRepository = new TaskRepository(prismaClient, toTaskConverter);
  const participantRepository = new ParticipantRepository(
    prismaClient,
    toTaskConverter,
    toParticipantConverter,
    toHavingTaskCollectionConverter,
  );

  const pairRepository = new PairRepository(prismaClient, toPairConverter);

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
    await prismaClient.pair.deleteMany();
    await taskRepository.create(dummyTask1);
    await taskRepository.create(dummyTask2);
    await taskRepository.create(dummyTask3);
    await participantRepository.create(dummyParticipant3);
    await participantRepository.create(dummyParticipant4);
    await participantRepository.create(dummyParticipant5);
    await participantRepository.create(dummyParticipant6);
    await participantRepository.create(dummyParticipant7);
    await participantRepository.create(dummyParticipant8);
    await participantRepository.create(dummyParticipant9);
    await pairRepository.create(dummyPair2);
    await pairRepository.create(dummyPair4);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const findPairName = async (id: string): Promise<string | null> => {
    const result = await prismaClient.participant.findUnique({ where: { participantId: id } });
    return result.pairName;
  };

  describe('create', () => {
    it('[正常]作成できる', async () => {
      const data: CreatePairUsecaseProps = {
        participantIds: [dummyParticipant5.id.toValue(), dummyParticipant6.id.toValue()],
      };
      expect(await findPairName(data.participantIds[0])).toEqual(null);
      expect(await findPairName(data.participantIds[1])).toEqual(null);
      expect(await prismaClient.pair.count()).toEqual(2);
      const res = await axios.post(url, data);
      expect(res.status).toEqual(201);
      expect(await findPairName(data.participantIds[0])).toEqual('c');
      expect(await findPairName(data.participantIds[1])).toEqual('c');
      expect(await prismaClient.pair.count()).toEqual(3);
    });
  });

  describe('findAll', () => {
    it('[正常]全件取得できる', async () => {
      const res = await axios.get(url);
      expect(res.status).toEqual(200);
      expect(res.data.length).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('[正常]検索できる', async () => {
      const pairId = dummyPair2.id.toValue();
      const res = await axios.get(`${url}/${pairId}`);
      expect(res.status).toEqual(200);
      expect(res.data.pairName).toEqual('b');
      expect(res.data.participants.length).toEqual(2);
    });
  });

  describe('delete', () => {
    it('[正常]削除できる', async () => {
      expect(await prismaClient.pair.count()).toEqual(2);
      const data = {
        participantId: dummyPair2.participants[0].id.toValue(),
      };
      const pairId = dummyPair2.id.toValue();
      const res = await axios.patch(`${url}/remove/${pairId}`, data);
      expect(res.status).toEqual(200);
      expect(await prismaClient.pair.count()).toEqual(1);
    });
  });

  describe('update', () => {
    it('[正常]更新できる', async () => {
      const pairId = dummyPair2.id.toValue();
      const participantId = dummyParticipant5.id.toValue();
      expect(await findPairName(participantId)).toEqual(null);
      const data = { participantId: participantId };
      const res = await axios.patch(`${url}/add/${pairId}`, data);
      expect(res.status).toEqual(200);
      expect(await findPairName(participantId)).toEqual(dummyPair2.pairName);
    });
  });
});
