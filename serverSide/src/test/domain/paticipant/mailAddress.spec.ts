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

  describe('MailAddressの等価比較', (): void => {
    test('[正常]同じメールアドレスを比較している', () => {
      const address1 = { mailAddress: 'aaa@gmail.com' };
      const mailAddress1 = MailAddress.create(address1);
      const address2 = { mailAddress: 'aaa@gmail.com' };
      const mailAddress2 = MailAddress.create(address2);
      expect(mailAddress1.equals(mailAddress2)).toBe(true);
    });
    test('[異常]異なるメールアドレスを比較している', () => {
      const address1 = { mailAddress: 'aaa@gmail.com' };
      const mailAddress1 = MailAddress.create(address1);
      const address2 = { mailAddress: 'bbb@gmail.com' };
      const mailAddress2 = MailAddress.create(address2);
      expect(mailAddress1.equals(mailAddress2)).toBe(false);
    });
    test('[異常]メールアドレスを参照渡しして比較する', () => {
      const address1 = { mailAddress: 'aaa@gmail.com' };
      const mailAddress1 = MailAddress.create(address1);
      const mailAddress2 = mailAddress1.changeMailAddress('bbb@gmail.com');
      console.log(mailAddress1.mailAddress);
      console.log(mailAddress2.mailAddress);
      expect(mailAddress1.equals(mailAddress2)).toBe(false);
    });
  });
});
