import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

describe('UniqueEntityID', () => {
  test('uuidとして正しくない文字列を与えてエラーになる', () => {
    expect(() => {
      new UniqueEntityID('aaa');
    }).toThrowError('aaaはuuidの型として正しくありません。');
  });
  test('uuidとして正しい形式の場合はうまくいく', () => {
    const uuid = '99999999-9999-9999-9999-999999999999';
    const id = new UniqueEntityID(uuid);
    expect(id.toValue()).toBe(uuid);
  });
});
