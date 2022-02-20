import { TaskGroup } from '../../domain/taskGroup/taskGroup';
import { ITaskGroupRepository } from '../../domain/taskGroup/repositoryInterface/ITaskGroupRepository';
import { TaskGroupDTO } from './DTO/taskGroupDTO';

interface CreateTaskGroupUsecaseProps {
  name: string;
}

export class CreateTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(props: CreateTaskGroupUsecaseProps): Promise<TaskGroupDTO> {
    const taskGroup = TaskGroup.create({
      taskGroup: props.name,
    });
    const result = await this.repo.create(taskGroup);
    return new TaskGroupDTO(result);
  }
}
