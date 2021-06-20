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

  // todo 値オブジェクトの場合、参照渡しをしたのと比べると等価でないオブジェクトでも等価になってしまう
  public equals(vo?: ValueObject<T>): boolean {
    return deepEqual(this.props, vo.props);
  }
}
