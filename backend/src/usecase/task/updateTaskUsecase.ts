import { Task } from '@/domain/task/task';
import { TaskGroup, taskGroupType } from '@/domain/taskGroup/taskGroup';
import { UniqueEntityID } from '@/domain/shared/uniqueEntityID';
import { ITaskRepository } from '@/domain/task/repositoryInterface/ITaskRepository';
import { TaskDTO } from '@/usecase/task/DTO/taskDTO';

export interface UpdateTaskUsecaseProps {
  taskId: string;
  updateNo?: number;
  updateName: string;
  updateDescription: string;
  updateGroup: string;
}

export class UpdateTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: UpdateTaskUsecaseProps): Promise<TaskDTO> {
    const data = {
      no: props.updateNo,
      name: props.updateName,
      description: props.updateDescription,
      group: TaskGroup.create({
        taskGroup: props.updateGroup as taskGroupType,
      }),
    };
    const id = new UniqueEntityID(props.taskId);
    const updateTask = Task.create(data, id);
    const result = await this.repo.update(updateTask);
    return new TaskDTO(result);
  }
}
