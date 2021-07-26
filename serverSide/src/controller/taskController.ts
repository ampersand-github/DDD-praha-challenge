import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskDTO } from '../usecase/task/DTO/taskDTO';
import { UpdateTaskUsecaseProps } from '../usecase/task/updateTaskUsecase';

export interface ITask {
  name: string;
  description: string;
  group: string;
}

@Controller('task')
export class TaskController {
  private taskService: TaskService;
  public constructor(taskService: TaskService) {
    this.taskService = taskService;
  }
  @Get()
  public async findAll(): Promise<TaskDTO[]> {
    return await this.taskService.findAll();
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<TaskDTO> {
    return await this.taskService.findOne(id);
  }
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }

  @Post()
  public async create(@Body() data: ITask) {
    return await this.taskService.create(data);
  }

  @Patch('/:id')
  public async update(
    @Param('id') taskId: string,
    @Body('updateName') updateName: string,
    @Body('updateDescription') updateDescription: string,
    @Body('updateGroup') updateGroup: string,
  ) {
    const data: UpdateTaskUsecaseProps = {
      taskId: taskId,
      updateName: updateName,
      updateDescription: updateDescription,
      updateGroup: updateGroup,
    };
    return await this.taskService.update(data);
  }
}
