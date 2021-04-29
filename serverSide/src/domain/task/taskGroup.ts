// todo DBとのマッピングをどうするか
import {ValueObject} from "../../shared/domain/ValueObject";

export const TaskGroupEnum = {
    webBasic: "WEBの基礎",
    test: "テスト",
    db: "DB",
    design:"設計"
} as const;
type taskGroupType = typeof TaskGroupEnum[keyof typeof TaskGroupEnum];


export interface TaskGroupProps {
    taskGroup: taskGroupType;
}

export class TaskGroup extends ValueObject<TaskGroupProps> {
    private constructor(props: TaskGroupProps) {
        super(props);
    }
    static create(props: TaskGroupProps): TaskGroup {
        return new TaskGroup(props);
    }
}
