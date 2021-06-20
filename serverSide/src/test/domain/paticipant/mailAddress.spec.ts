import { MailAddress } from '../../../domain/participant/mailAddress';

describe('MailAddress', (): void => {
  test('クラスが生成できること', () => {
    const goodAddress = { mailAddress: 'aaa@gmail.com' };
    const mailAddress = MailAddress.create(goodAddress);
    expect(mailAddress).toBeInstanceOf(MailAddress);
  });

  test('引数で与えた名前が取得できること', () => {
    const goodAddress = { mailAddress: 'aaa@gmail.com' };
    const mailAddress = MailAddress.create(goodAddress);
    expect(mailAddress.mailAddress).toBe(goodAddress.mailAddress);
  });

  test('@がない不正なメールアドレスが弾かれる', () => {
    const email = { mailAddress: 'aaagmail.com' };
    expect(() => {
      MailAddress.create(email);
    }).toThrow(`${email.mailAddress}のメールアドレスの書式が間違っています。`);
  });
  test('空文字の不正なアドレスが弾かれる', () => {
    const email = { mailAddress: '' };
    expect(() => {
      MailAddress.create(email);
    }).toThrow(`${email.mailAddress}のメールアドレスの書式が間違っています。`);
  });
  test('等しいこと', () => {
    const goodAddress = { mailAddress: 'aaa@gmail.com' };
    const result = MailAddress.create(goodAddress);
    expect(result.equals(result)).toBe(true);
  });

  describe('等価比較', (): void => {
    test('値を変更してもとの値と等価比較したら失敗する', () => {
      const goodAddress = { mailAddress: 'aaa@gmail.com' };
      const goodAddress2 = { mailAddress: 'bbb@gmail.com' };
      const mailAddress = MailAddress.create(goodAddress);
      const updateMailAddress = mailAddress.changeMailAddress(goodAddress2.mailAddress);
      expect(mailAddress.equals(updateMailAddress)).toBe(false);
    });
  });
});
