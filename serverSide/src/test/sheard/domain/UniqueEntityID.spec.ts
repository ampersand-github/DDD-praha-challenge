import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Identifier } from '../../../shared/domain/Identifier';

describe('UniqueEntityID', () => {
  const uuid = '99999999-a999-9b99-99c9-999999d99999';
  const id = new UniqueEntityID(uuid);

  test('uuidとして正しくない文字列を与えてエラーになる', () => {
    expect(() => {
      new UniqueEntityID('aaa');
    }).toThrowError('aaaはuuidの型として正しくありません。');
  });
  test('uuidとして正しい形式の場合はうまくいく', () => {
    expect(id.toValue()).toBe(uuid);
  });
  test('等価比較', () => {
    expect(id.equals(id)).toBe(true);
  });
  test('null', () => {
    expect(() => {
      new UniqueEntityID(null);
    }).toThrowError('nullはuuidの型として正しくありません。');
  });
  test('空文字を入力', () => {
    expect(() => {
      new UniqueEntityID('');
    }).toThrowError('はuuidの型として正しくありません。');
  });

  test('idがnull', () => {
    const actual = new Identifier(null);
    expect(actual.equals()).toBe(false);
  });
  test('toString', () => {
    const actual = new Identifier('aaa');
    expect(actual.toString()).toBe('aaa');
  });
});
