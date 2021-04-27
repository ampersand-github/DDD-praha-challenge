import { ParticipantId } from '../../../../domain/participant/participant/participantId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

describe('ParticipantId', (): void => {
  const uuid = { participantID: UniqueEntityID };

  test('good pattern', () => {
    expect(ParticipantId.create().id);
  });

  test('good pattern2', () => {
    const uuid = new UniqueEntityID('c8b93182-3993-4543-8991-0be6dc9fe8d9');
    expect(ParticipantId.create(uuid).id).toBe(uuid);
  });
});
