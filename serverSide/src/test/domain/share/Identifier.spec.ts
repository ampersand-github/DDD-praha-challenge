import { Identifier } from '../../../domain/shared/Identifier';

describe('Identifier', () => {
  describe('equals', () => {
    test('[異常]equalsに引数がない', () => {
      const actual = new Identifier('aaa');
      expect(actual.equals()).toBe(false);
    });
    describe('toString', () => {
      test('[正常]文字列にして取得', () => {
        const actual = new Identifier('aaa');
        expect(actual.toString()).toBe('aaa');
      });
    });
  });
});
