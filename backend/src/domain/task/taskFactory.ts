import { ITaskRepository } from './repositoryInterface/ITaskRepository';
import { Task } from './task';
import { TaskGroup } from '../taskGroup/taskGroup';

interface TaskFactoryProps {
  name: string;
  description: string;
  group: string;
}

export class TaskFactory {
  private readonly taskRepository: ITaskRepository;
  public constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }
  public async factory(props: TaskFactoryProps): Promise<Task> {
    const group = TaskGroup.create({ taskGroup: props.group });
    const nextTaskNo = await this.taskRepository.taskMaxNo();
    return Task.create({
      no: nextTaskNo + 1,
      name: props.name,
      description: props.description,
      group: group,
    });
  }
}
