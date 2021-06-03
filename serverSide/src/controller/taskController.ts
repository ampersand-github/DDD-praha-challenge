import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { whenEmptyOutputError } from './shared/whenEmptyOutputError';
import { FindAllTaskUsecase } from '../usecase/task/findAllTaskUsecase';
import { FindOneTaskUsecase } from '../usecase/task/findOneTaskUsecase';
import { DeleteTaskUsecase } from '../usecase/task/deleteTaskUsecase';
import { CreateTaskUsecase } from '../usecase/task/createTaskUsecase';
import { UpdateTaskUsecase } from '../usecase/task/updateTaskUsecase';
import { TaskDTO } from '../usecase/task/DTO/taskDTO';
import { TaskRepository } from '../infra/db/repository/taskRepository';

//
// 動かすときはデータを初期化してから動かすこと
// npm run db:reset:withData
//
@Controller('task')
export class TaskController {
  // curl -X GET http://localhost:3000/task
  @Get()
  public async findAll(): Promise<TaskDTO[]> {
    const repo = new TaskRepository();
    const usecase = new FindAllTaskUsecase(repo);
    return await usecase.do();
  }
  // curl -X GET http://localhost:3000/task/99999999-9999-aaaa-aaaa-999999999999
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<TaskDTO> {
    const repo = new TaskRepository();
    const usecase = new FindOneTaskUsecase(repo);
    const data = { id: id };
    return await usecase.do(data);
  }

  // curl -X DELETE http://localhost:3000/task/99999999-9999-aaaa-aaaa-999999999999
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const repo = new TaskRepository();
    const usecase = new DeleteTaskUsecase(repo);
    const data = { id: id };
    return await usecase.do(data);
  }

  // curl -X POST http://localhost:3000/task -d 'name=ダミータスク2' -d 'description=ダミーの説明2' -d 'group=設計'
  @Post()
  public async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('group') group: string,
  ) {
    whenEmptyOutputError(name);
    whenEmptyOutputError(description);
    whenEmptyOutputError(group);
    const data = {
      name: name,
      description: description,
      group: group,
    };
    const repo = new TaskRepository();
    const usecase = new CreateTaskUsecase(repo);
    return await usecase.do(data);
  }

  // curl -X PATCH http://localhost:3000/task/99999999-9999-aaaa-aaaa-999999999999 -d 'newNo=1' -d 'newName=HTTPヘッダを理解しない' -d 'newDescription=新しい説明文' -d 'newGroup=テスト'
  // curl -X PATCH http://localhost:3000/task/99999999-9999-aaaa-aaaa-999999999999 -d 'newName=HTTPヘッダを理解しなくもない'
  @Patch('/:id')
  public async update(
    @Param('id') taskId: string,
    @Body('newNo') newNo: string,
    @Body('newName') newName: string,
    @Body('newDescription') newDescription: string,
    @Body('newGroup') newGroup: string,
  ) {
    const data = {
      taskId: taskId,
      newNo: newNo === undefined ? undefined : parseInt(newNo),
      newName: newName,
      newDescription: newDescription,
      newGroup: newGroup,
    };
    const repo = new TaskRepository();
    const usecase = new UpdateTaskUsecase(repo);
    return await usecase.do(data);
  }
}
