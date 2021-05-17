import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

describe('UniqueEntityID', () => {
  test('uuidとして正しくない文字列を与えてエラーになる', () => {
    expect(() => {
      new UniqueEntityID('aaa');
    }).toThrowError('aaaはuuidの型として正しくありません。');
  });
  test('uuidとして正しい形式の場合はうまくいく', () => {
    const uuid = '99999999-9999-9999-9999-99999999999a';
    const id = new UniqueEntityID(uuid);
    expect(id.toValue()).toBe(uuid);
  });
});
