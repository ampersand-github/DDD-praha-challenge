import { UniqueEntityID } from './UniqueEntityID';

export abstract class Entity<T> {
  private readonly _id: UniqueEntityID;
  // 型をprotectedにして、継承先クラスからしかアクセスできないようにする。
  // (クラス外からアクセスできないようにする)
  protected props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }
    return this._id.equals(object._id);
  }
}
