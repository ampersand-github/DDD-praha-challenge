# READ ME
DDD

## アプリケーションの始め方
```zsh
cd db
docker-compose up -d

cd ../
cd serverSide
npm run start:debug
open http://localhost:3000/
```


## Prismaのマイグレーション
### モデルのマイグレーション
`schema.prisma`にmodel追加
```zsh
cd ../
cd serverSide
prisma migrate dev --preview-feature
```
### シード値のマイグレーション
```zsh
cd serverSide
prisma db seed --preview-feature
// or 
prisma migrate reset
```


## 今後の方針
+ [x] 簡単なcrud(practice)
+ [x] github関連、mainとdevに分けて開発をする
+ [x] モデリング再考
+ [ ] シード値の埋め込み
    + [x] シード値の埋め込み(参加者側)
    + [x] シード値の埋め込み(課題側)
    + [x] シード値の埋め込みの整形作業
+ [x] SQL考える
+ [x] githubへ上げて、レビューしてもらう
+ [x] いろいろなサンプルDDDを触ってみる[ドメイン駆動設計のまとめ - 全般](https://scrapbox.io/ampersand/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%AE%E3%81%BE%E3%81%A8%E3%82%81)
+ [x] lintとformatterの設定
+ [ ] テスト環境切り替えシステム
+ [ ] アプリケーションログの実装

+ [ ] DDDの実装
  + [ ] ドメイン層の抽象クラス
  + [x] ドメインオブジェクトとエンティティの生成
    + [x] 参加者集約
    + [x] 課題集約
  + [x] ドメイン層のテスト
    + [x] 参加者集約
    + [x] 課題集約
  + [ ] ユースケース層
    + [ ] 参加者
      + [ ] TODO
      + [ ] 実装
      + [ ] テスト
    + [ ] 課題
      + [ ] TODO  
      + [ ] 実装
      + [ ] テスト
  っっｓ

## リンク
- [課題36 特大課題：プラハチャレンジをDDDで実装してみる - 全般](https://scrapbox.io/ampersand/%E8%AA%B2%E9%A1%8C36_%E7%89%B9%E5%A4%A7%E8%AA%B2%E9%A1%8C%EF%BC%9A%E3%83%97%E3%83%A9%E3%83%8F%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E3%82%92DDD%E3%81%A7%E5%AE%9F%E8%A3%85%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)
- [モデル図 - プラハチャレンジをDDDで実装してみる - - 全般](https://scrapbox.io/ampersand/%E3%83%A2%E3%83%87%E3%83%AB%E5%9B%B3_-_%E3%83%97%E3%83%A9%E3%83%8F%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E3%82%92DDD%E3%81%A7%E5%AE%9F%E8%A3%85%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B_-)
