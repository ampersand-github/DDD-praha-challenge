import { MailAddress } from '../../../../domain/participant/participant/mailAddress';

describe('MailAddress', (): void => {
  const goodAddress = { mailAddress: 'aaa@gmail.com' };
  const badAddress = { mailAddress: 'aaagmail.com' };
  const badAddress2 = { mailAddress: '' };
  test('good pattern', () => {
    const mailAddress = MailAddress.create(goodAddress);
    expect(mailAddress.value).toBe(goodAddress.mailAddress);
  });

  test('bad pattern - @がない - ', () => {
    expect(() => {
      MailAddress.create(badAddress);
    }).toThrow();
  });
  test('bad pattern - 空文字 - ', () => {
    expect(() => {
      MailAddress.create(badAddress2);
    }).toThrow();
  });
});
