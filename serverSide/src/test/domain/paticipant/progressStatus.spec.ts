import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../../../domain/participant/progressStatus';

describe('ProgressStatus', (): void => {
  const complete = { progressStatus: ProgressStatusEnum.complete };

  test('オブジェクトが生成できること', () => {
    const actual = ProgressStatus.create(complete);
    expect(actual).toBeInstanceOf(ProgressStatus);
  });
});
