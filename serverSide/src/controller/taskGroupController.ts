import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { whenEmptyOutputError } from './shared/whenEmptyOutputError';
import { TaskGroupRepository } from '../infra/db/repository/taskGroupRepository';
import { FindAllTaskGroupUsecase } from '../usecase/taskGroup/FindAllTaskGroupUsecase';
import { CreateTaskGroupUsecase } from '../usecase/taskGroup/CreateTaskGroupUsecase';
import { DeleteTaskGroupUsecase } from '../usecase/taskGroup/DeleteTaskGroupUsecase';
import { TaskGroupDTO } from '../usecase/taskGroup/DTO/taskGroupDTO';

//
// 動かすときはデータを初期化してから動かすこと
// npm run db:reset:withData
//

@Controller('taskGroup')
export class TaskGroupController {
  // curl -X GET http://localhost:3000/taskGroup
  @Get()
  public async findAll(): Promise<TaskGroupDTO[]> {
    const repo = new TaskGroupRepository();
    const usecase = new FindAllTaskGroupUsecase(repo);
    return await usecase.do();
  }

  // curl -X DELETE http://localhost:3000/taskGroup/99999999-9999-aaaa-aaaa-999999999999
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const repo = new TaskGroupRepository();
    const usecase = new DeleteTaskGroupUsecase(repo);
    const data = { id: id };
    return await usecase.do(data);
  }

  // curl -X POST http://localhost:3000/taskGroup -d 'name=ここに新しいタスク名'
  @Post()
  public async create(@Body('name') name: string) {
    whenEmptyOutputError(name);
    const repo = new TaskGroupRepository();
    const usecase = new CreateTaskGroupUsecase(repo);
    const data = { name: name };
    return await usecase.do(data);
  }
  /*
  // curl -X PATCH http://localhost:3000/task/99999999-9999-aaaa-aaaa-999999999999 -d 'newName=ここに更に新しいタスク名'
  @Patch('/:id')
  public async update(
    @Param('id') taskId: string,
    @Body('newName') newName: string,
  ) {
    const repo = new TaskGroupRepository();
    const usecase = new UpdateTaskGroupUsecase(repo);
    return await usecase.do(newName);
  }
 */
}
