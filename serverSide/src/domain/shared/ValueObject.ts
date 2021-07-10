/*
参考
https://khalilstemmler.com/articles/typescript-value-object/
https://blog.mamansoft.net/2020/02/19/express-value-object-by-typescript/
 */

import deepEqual from 'deep-equal';

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  // publicにするとgetter,setterを使わずに呼び出せてしまうので、protectedにする
  protected props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return deepEqual(this.props, vo.props);
  }
}
