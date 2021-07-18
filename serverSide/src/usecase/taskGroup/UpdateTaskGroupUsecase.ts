import { TaskGroup } from '../../domain/taskGroup/taskGroup';
import { ITaskGroupRepository } from '../../domain/taskGroup/repositoryInterface/ITaskGroupRepository';
import { TaskGroupDTO } from './DTO/taskGroupDTO';

interface UpdateTaskGroupUsecaseProps {
  name: string;
}

export class UpdateTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(props: UpdateTaskGroupUsecaseProps): Promise<TaskGroupDTO> {
    const taskGroup = TaskGroup.create({
      taskGroup: props.name,
    });
    const result = await this.repo.update(taskGroup);
    return new TaskGroupDTO(result);
  }
}
