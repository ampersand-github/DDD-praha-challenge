import { ITaskRepository } from '../../Interface/repository/ITaskRepository';
import { Task } from '../../domain/task/task';
import { TaskGroup, taskGroupType } from '../../domain/task/taskGroup';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

interface UpdateTaskUsecaseProps {
  taskId: string;
  newNo: number;
  newName: string;
  newDescription: string;
  newGroup: string;
}

export class UpdateTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: UpdateTaskUsecaseProps): Promise<Task> {
    const data = {
      no: props.newNo,
      name: props.newName,
      description: props.newDescription,
      group: TaskGroup.create({
        taskGroup: props.newGroup as taskGroupType,
      }),
    };
    const id = new UniqueEntityID(props.taskId);
    const updateTask = Task.create(data, id);
    const result = await this.repo.update(updateTask);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
