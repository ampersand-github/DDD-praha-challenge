import { ITaskGroupRepository } from '../../Interface/repository/ITaskGroupRepository';
import { TaskGroupDTO } from '../../dto/usecase/task/taskGroupDTO';
import { TaskGroup } from '../../domain/task/taskGroup';

export class FindAllTaskGroupUsecase {
  private readonly repo: ITaskGroupRepository;

  public constructor(repository: ITaskGroupRepository) {
    this.repo = repository;
  }

  public async do(): Promise<TaskGroupDTO[]> {
    const taskGroupList = await this.repo.findAll();
    return taskGroupList.map((one: TaskGroup) => {
      return new TaskGroupDTO(one);
    });
  }
}
