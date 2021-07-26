import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../controller/service/task.service';
import axios from 'axios';
import { ITask } from '../../controller/taskController';
import { Converter } from '../../infra/db/repository/shared/converter';
import { TaskRepository } from '../../infra/db/repository/taskRepository';
import { prismaClient } from '../../util/prisma/prismaClient';
import { truncateAllTable } from '../../testUtil/reposiotry/truncateAllTable';
import { dummyTask1 } from '../../testUtil/dummy/dummyTask';
import { UpdateTaskUsecaseProps } from '../../usecase/task/updateTaskUsecase';

// コントローラのテストはhttpステータスの確認のみ。実質ユースケースを実行しているだけなので。
describe('TaskService', () => {
  let service: TaskService;
  const url = 'http://localhost:3000/task';
  const converter = new Converter();
  const repo = new TaskRepository(prismaClient, converter);

  beforeAll(async () => {
    await truncateAllTable();
    // dockerを起動する
    // npm run start:devを起動する
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();
    service = module.get<TaskService>(TaskService);
    //
    await prismaClient.task.deleteMany(); // truncateと同じ
    await repo.create(dummyTask1);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crud', () => {
    it('create', async () => {
      const data: ITask = {
        name: 'ダミータスク',
        description: 'ダミーの説明2',
        group: '設計',
      };
      const res = await axios.post(url, data);
      expect(service).toBeDefined();
      expect(res.status).toEqual(201);
    });

    it('findAll', async () => {
      const res = await axios.get(url);
      expect(res.status).toEqual(200);
      expect(res.data.length).toEqual(1);
    });

    it('findOne', async () => {
      const id = dummyTask1.id.toValue();
      const res = await axios.get(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(res.data.id).toEqual(dummyTask1.id.toValue());
      expect(res.data.no).toEqual(dummyTask1.no.toString());
      expect(res.data.name).toEqual(dummyTask1.name);
      expect(res.data.description).toEqual(dummyTask1.description);
      expect(res.data.group).toEqual(dummyTask1.group);
    });

    it('delete', async () => {
      expect(await prismaClient.task.count()).toEqual(1);
      const id = dummyTask1.id.toValue();
      const res = await axios.delete(`${url}/${id}`);
      expect(res.status).toEqual(200);
      expect(await prismaClient.task.count()).toEqual(0);
    });

    it('update', async () => {
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
