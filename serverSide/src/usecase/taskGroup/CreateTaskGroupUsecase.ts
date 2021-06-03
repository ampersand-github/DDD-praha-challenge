import { TaskGroup } from '../../domain/taskGroup/taskGroup';
import { ITaskGroupRepository } from '../../domain/taskGroup/ITaskGroupRepository';

interface CreateTaskGroupUsecaseProps {
  name: string;
}

export class CreateTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(props: CreateTaskGroupUsecaseProps): Promise<TaskGroup> {
    const taskGroup = TaskGroup.create({
      taskGroup: props.name,
    });
    const result = await this.repo.create(taskGroup);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
