import {ValueObject} from "../../shared/domain/ValueObject";
import {Task} from "./task";

interface ParticipantHavingTaskProps {
task:Task
}

export class ParticipantHavingTask extends ValueObject<ParticipantHavingTaskProps> {

    private constructor(props: ParticipantHavingTaskProps) {
        super(props);
    }
    static create(props: ParticipantHavingTaskProps): ParticipantHavingTask {
        return new ParticipantHavingTask(props);
    }
}
