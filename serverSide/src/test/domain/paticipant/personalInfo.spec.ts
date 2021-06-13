import { dummyPersonalIfo1 } from '../../../testUtil/dummyPersonalInfo';

describe('PersonalInfo', () => {
  describe('participantName', () => {
    test('[正常]名前が取得できること', () => {
      expect(dummyPersonalIfo1.participantName).toBe('山田太郎');
    });
  });
  describe('mailAddress', () => {
    test('[正常]メールアドレスが取得できること', () => {
      expect(dummyPersonalIfo1.mailAddress).toBe('yamada@gmail.com');
    });
  });
});
