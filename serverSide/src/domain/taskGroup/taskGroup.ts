import { ValueObject } from '../shared/ValueObject';

export const TaskGroupEnum = {
  webBasic: 'WEBの基礎',
  test: 'テスト',
  db: 'DB',
  design: '設計',
} as const;
export type taskGroupType = typeof TaskGroupEnum[keyof typeof TaskGroupEnum];

export interface TaskGroupProps {
  taskGroup: string;
}

export class TaskGroup extends ValueObject<TaskGroupProps> {
  public get taskGroup() {
    return this.props.taskGroup;
  }

  private constructor(props: TaskGroupProps) {
    super(props);
  }
  public static create(props: TaskGroupProps): TaskGroup {
    if (!Object.values(TaskGroupEnum).includes(props.taskGroup as taskGroupType)) {
      throw new Error('タスクグループ名が不正です。');
    }
    return new TaskGroup(props);
  }
}
