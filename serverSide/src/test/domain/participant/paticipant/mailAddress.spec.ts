import { MailAddress } from '../../../../domain/participant/participant/mailAddress';

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
});
