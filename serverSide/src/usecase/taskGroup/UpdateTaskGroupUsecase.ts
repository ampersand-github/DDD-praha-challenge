import { TaskGroup } from '../../domain/task/taskGroup';
import { ITaskGroupRepository } from '../../Interface/repository/ITaskGroupRepository';

interface UpdateTaskGroupUsecaseProps {
  name: string;
}

export class UpdateTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(props: UpdateTaskGroupUsecaseProps): Promise<TaskGroup> {
    const taskGroup = TaskGroup.create({
      taskGroup: props.name,
    });
    const result = await this.repo.update(taskGroup);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
