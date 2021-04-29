import {TaskGroup, TaskGroupEnum} from "../../../domain/task/taskGroup";
import {ParticipantHavingTask} from "../../../domain/task/participantHavingTask";
import {Task} from "../../../domain/task/task";

describe('ParticipantHavingTask', (): void => {
    const active = { no:1,name:'よく使うHTTPヘッダを理解する',description: 'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
        group:TaskGroup.create({taskGroup:TaskGroupEnum.webBasic}) };
    const task = Task.create(active)
    test('引数で与えた値が取得できること', () => {
        const actual = ParticipantHavingTask.create({task:task});
        expect(actual.props.task.props.no).toBe(1);
    });
});
