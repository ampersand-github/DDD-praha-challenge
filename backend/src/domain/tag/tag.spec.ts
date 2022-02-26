import { ITag, Tag, TagType } from "@/domain/tag/tag";

describe('タグ', (): void => {
  // 正常系のテスト
   test('タグの値オブジェクトを生成できる', () => {
     // 「TagType.」とまで打てばIDEの補完機能で
     // 「draft・open・onlyMember」のいずれかが表示されるので便利
     const draft:ITag = {tag: TagType.draft}
     // 上記で生成したのを引数に値オブジェクトを生成
     const actual = Tag.create(draft);

     // 生成されている
     expect(actual).toBeInstanceOf(Tag);
     expect(actual.tag).toBe(draft.tag)
   });

  // 以上系のテスト
  test('想定していないタグで値オブジェクトは生成できない', () => {
    // 想定していない間違ったタグ
    const bad:ITag = {tag: "bad"}
    // 値オブジェクトを生成するとエラーが起きる
    expect(() => {
      Tag.create(bad);
    }).toThrowError('タグ名が誤っています。');
  });
});
