import { whenEmptyOutputError } from '../../../controller/shared/whenEmptyOutputError';
describe('whenEmptyOutputError', (): void => {
  test('文字列を渡すのでエラーがでない', () => {
    whenEmptyOutputError('aaa');
    expect(1).toStrictEqual(1);
  });

  test('nullを渡すのでエラーになる', () => {
    expect(() => {
      whenEmptyOutputError(null);
    }).toThrowError(`nullは入力できません。`);
  });
  test('nullを渡すのでエラーになる', () => {
    expect(() => {
      whenEmptyOutputError(undefined);
    }).toThrowError(`undefinedは入力できません。`);
  });
  test('nullを渡すのでエラーになる', () => {
    expect(() => {
      whenEmptyOutputError('');
    }).toThrowError(`空のstringは入力できません。`);
  });
});
