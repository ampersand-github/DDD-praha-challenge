import { v4 as uuid } from 'uuid';

export const pairDataSource = (participantDataSource) => {
    return [
        {
            pairId: uuid(),
            pairName: "A",
            participantId:participantDataSource[0].participantId
        },
        {
            pairId: uuid(),
            pairName: "A",
            participantId:participantDataSource[1].participantId
        },
        {
            pairId: uuid(),
            pairName: "A",
            participantId:participantDataSource[2].participantId
        },
        {
            pairId: uuid(),
            pairName: "B",
            participantId:participantDataSource[3].participantId
        },
        {
            pairId: uuid(),
            pairName: "B",
            participantId:participantDataSource[4].participantId
        },
    ];
}
