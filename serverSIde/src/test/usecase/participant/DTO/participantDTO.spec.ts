import { ParticipantDTO } from '@/usecase/participant/DTO/participantDTO';
import { dummyParticipant1 } from '@/testUtil/dummy/dummyPerticipant';

describe('ParticipantDTO', (): void => {
  describe('constructor', (): void => {
    test('[正常]返り値が取得できる', () => {
      expect(new ParticipantDTO(dummyParticipant1)).toBeInstanceOf(ParticipantDTO);
    });
  });
});
