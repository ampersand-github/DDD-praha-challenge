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
  test('等価比較', () => {
    const email1 = { mailAddress: 'aaa@gmail.com' };
    const email2 = { mailAddress: 'aaa@gmail.com' };
    const mailAddress1 = MailAddress.create(email1);
    const mailAddress2 = MailAddress.create(email2);
    expect(mailAddress1.equals(mailAddress2)).toBe(true);
  });
  test('[異常]等価比較', () => {
    const email1 = { mailAddress: 'aaa@gmail.com' };
    const mailAddress1 = MailAddress.create(email1);
    expect(mailAddress1.equals()).toBe(false);
  });
});
