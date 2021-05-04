import {
  ProgressStatus,
  ProgressStatusEnum,
} from '../../../domain/task/progressStatus';

describe('ProgressStatus', (): void => {
  const active = { progressStatus: ProgressStatusEnum.complete };

  test('引数で与えた値が取得できるこ', () => {
    const actual = ProgressStatus.create(active);
    expect(actual.props.progressStatus).toBe(active.progressStatus);
  });
});
