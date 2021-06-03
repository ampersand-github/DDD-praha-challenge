import { Task } from '../../domain/task/task';
import { TaskGroup } from '../../domain/taskGroup/taskGroup';
import { ITaskRepository } from '../../domain/task/repositoryInterface/ITaskRepository';

interface CreateTaskUsecaseProps {
  name: string;
  description: string;
  group: string;
}

export class CreateTaskUsecase {
  private readonly repo: ITaskRepository;

  public constructor(repository: ITaskRepository) {
    this.repo = repository;
  }

  public async do(props: CreateTaskUsecaseProps): Promise<Task> {
    const group = TaskGroup.create({
      taskGroup: props.group,
    });
    // todo ドメインサービスにすべき？
    const nextTaskNo = await this.repo.nextTaskNo();

    const task = Task.create({
      no: nextTaskNo + 1,
      name: props.name,
      description: props.description,
      group: group,
    });
    const result = await this.repo.create(task);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
