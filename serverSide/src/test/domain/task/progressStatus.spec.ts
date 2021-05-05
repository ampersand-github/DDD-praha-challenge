import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../../../domain/task/progressStatus';

describe('ProgressStatus', (): void => {
  const complete = { progressStatus: ProgressStatusEnum.complete };

  test('引数で与えた値が取得できると', () => {
    const actual = ProgressStatus.create(complete);
    expect(actual.values.progressStatus).toBe(complete.progressStatus);
  });
});
