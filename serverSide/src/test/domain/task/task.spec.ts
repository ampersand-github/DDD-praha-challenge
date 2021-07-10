import { dummyTask1 } from '../../../testUtil/dummy/dummyTask';

describe('Task', (): void => {
  describe('no()', (): void => {
    test('[正常]値を取得できる', () => {
      expect(dummyTask1.no).toBe(1);
    });
  });
  describe('name()', (): void => {
    test('[正常]値を取得できる', () => {
      expect(dummyTask1.name).toBe('よく使うHTTPヘッダを理解する');
    });
  });
  describe('description()', (): void => {
    test('[正常]値を取得できる', () => {
      expect(dummyTask1.description).toBe(
        'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
      );
    });
  });
  describe('group()', (): void => {
    test('[正常]値を取得できる', () => {
      expect(dummyTask1.group).toBe('WEBの基礎');
    });
  });

  describe('changeName()', (): void => {
    test('[正常]値を変更できる', () => {
      const expected = 'aaa';
      dummyTask1.changeName(expected);
      expect(dummyTask1.name).toBe('aaa');
    });
  });
  describe('changeNo()', (): void => {
    test('[正常]値を変更できる', () => {
      const expected = 100;
      dummyTask1.changeNo(expected);
      expect(dummyTask1.no).toBe(expected);
    });
  });
});
