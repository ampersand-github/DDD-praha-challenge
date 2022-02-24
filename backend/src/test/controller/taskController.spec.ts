import axios from 'axios';
import { ITask } from "@/controller/taskController";
import { TaskRepository } from "@/infra/db/repository/taskRepository";
import { prismaClient } from "@/util/prisma/prismaClient";
import { truncateAllTable } from "@/testUtil/reposiotry/truncateAllTable";
import { dummyTask1 } from "@/testUtil/dummy/dummyTask";
import { UpdateTaskUsecaseProps } from "@/usecase/task/updateTaskUsecase";
import { ToTaskConverter } from "@/infra/db/repository/shared/converter/ToTaskConverter";
require('dotenv').config();

// コントローラのテストはhttpステータスの確認のみ。実質ユースケースを実行しているだけなので。
describe('TaskController', () => {
  const port = process.env.PORT
  const url = `http://localhost:${port}/task`;
  const toTaskConverter = new ToTaskConverter();
  const repo = new TaskRepository(prismaClient, toTaskConverter);

  beforeAll(async () => {
    await truncateAllTable();
    // dockerを起動する
    // npm run start:devを起動する
  });

  beforeEach(async () => {
    await prismaClient.task.deleteMany(); // truncateと同じ
    await repo.create(dummyTask1);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

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
  describe('findAll', () => {
    it('[正常]全件取得できる', async () => {
      const res = await axios.get(url);
      expect(res.status).toEqual(200);
      expect(res.data.length).toEqual(1);
    });
  });
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
  describe('delete', () => {
    it('[正常]削除できる', async () => {
      expect(await prismaClient.task.count()).toEqual(1);
      const id = dummyTask1.id.toValue();
      const res = await axios.delete(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(await prismaClient.task.count()).toEqual(0);
    });
  });
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
});
