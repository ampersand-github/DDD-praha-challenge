import * as deepEqual from 'deep-equal';

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  // publicにするとgetter,setterを使わずに呼び出せてしまうので、protectedにする
  protected props: T;

  protected constructor(props: T) {
    this.props = {
      ...props,
    };
  }

  // todo テスト、オブジェクトの等価比較
  public equals(vo?: ValueObject<T>): boolean {
    return deepEqual(this.props, vo.props);
  }
}
