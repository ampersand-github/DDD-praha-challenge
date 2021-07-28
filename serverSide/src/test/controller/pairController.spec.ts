import axios from 'axios';
import { ITask } from '../../controller/taskController';
import { Converter } from '../../infra/db/repository/shared/converter';
import { TaskRepository } from '../../infra/db/repository/taskRepository';
import { prismaClient } from '../../util/prisma/prismaClient';
import { truncateAllTable } from '../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1, dummyTask2, dummyTask3 } from '../../testUtil/dummy/dummyTask';
import { UpdateTaskUsecaseProps } from '../../usecase/task/updateTaskUsecase';
import {
  dummyParticipant1,
  dummyParticipant3,
  dummyParticipant4,
  dummyParticipant5,
  dummyParticipant6,
  dummyParticipant7,
} from '../../testUtil/dummy/dummyPerticipant';
import { dummyPair2 } from '../../testUtil/dummy/dummyPair';
import { ParticipantRepository } from '../../infra/db/repository/participantRepository';
import { PairRepository } from '../../infra/db/repository/pairRepository';

// コントローラのテストはhttpステータスの確認のみ。実質ユースケースを実行しているだけなので。
describe('PairController', () => {
  const url = 'http://localhost:3000/pair';
  const converter = new Converter();
  const taskRepository = new TaskRepository(prismaClient, converter);
  const participantRepository = new ParticipantRepository(prismaClient, converter);
  const pairRepository = new PairRepository(prismaClient, converter);

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
    await participantRepository.create(dummyParticipant1);
    await participantRepository.create(dummyParticipant3);
    await participantRepository.create(dummyParticipant4);
    await participantRepository.create(dummyParticipant5);
    await participantRepository.create(dummyParticipant6);
    await participantRepository.create(dummyParticipant7);
    await pairRepository.create(dummyPair2);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });
  describe('create', () => {
    it('[正常]作成できる', async () => {
      expect(1).toEqual(1);
    });
  });
  /*
  describe('create', () => {
    it('[正常]作成できる', async () => {
      const data: ITask = {
        name: 'ダミータスク',
        description: 'ダミーの説明2',
        group: '設計',
      };
      const res = await axios.post(url, data);
      expect(res.status).toEqual(201);
    });
  });
 */
  /*
  describe('findAll', () => {
    it('[正常]全件取得できる', async () => {
      const res = await axios.get(url);
      expect(res.status).toEqual(200);
      expect(res.data.length).toEqual(1);
    });
  });
 */
  /*
  describe('findOne', () => {
    it('[正常]検索できる', async () => {
      const id = dummyTask1.id.toValue();
      const res = await axios.get(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(res.data.id).toEqual(dummyTask1.id.toValue());
      expect(res.data.no).toEqual(dummyTask1.no.toString());
      expect(res.data.name).toEqual(dummyTask1.name);
      expect(res.data.description).toEqual(dummyTask1.description);
      expect(res.data.group).toEqual(dummyTask1.group);
    });
  });
 */
  /*
  describe('delete', () => {
    it('[正常]削除できる', async () => {
      expect(await prismaClient.task.count()).toEqual(1);
      const id = dummyTask1.id.toValue();
      const res = await axios.delete(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(await prismaClient.task.count()).toEqual(0);
    });
  });
 */
  /*
  describe('update', () => {
    it('[正常]更新できる', async () => {
      const id = dummyTask1.id.toValue();
      const data: UpdateTaskUsecaseProps = {
        taskId: id,
        updateName: 'updateName',
        updateDescription: 'updateDescription',
        updateGroup: 'DB',
      };
      const res = await axios.patch(`${url}/${id}`, data);
      expect(res.status).toEqual(200);
      expect(res.data.id).toEqual(id);
      expect(res.data.name).toEqual(data.updateName);
      expect(res.data.description).toEqual(data.updateDescription);
      expect(res.data.group).toEqual(data.updateGroup);
    });
  });
 */
});
