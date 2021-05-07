import { MailAddress } from '../../../../domain/participant/participant/mailAddress';

describe('MailAddress', (): void => {
  test('引数で与えた名前が取得できること', () => {
    const goodAddress = { mailAddress: 'aaa@gmail.com' };
    const mailAddress = MailAddress.create(goodAddress);
    expect(mailAddress.mailAddress).toBe(goodAddress.mailAddress);
  });

  test('@がない不正なメールアドレスが弾かれる', () => {
    expect(() => {
      MailAddress.create({ mailAddress: 'aaagmail.com' });
    }).toThrow();
  });
  test('空文字の不正なアドレスが弾かれる', () => {
    expect(() => {
      MailAddress.create({ mailAddress: '' });
    }).toThrow();
  });
});
