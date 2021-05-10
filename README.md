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
+ [x] 練習
  + [x] 簡単なcrud(practice)
  + [x] いろいろなサンプルDDDを触ってみる[ドメイン駆動設計のまとめ - 全般](https://scrapbox.io/ampersand/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%AE%E3%81%BE%E3%81%A8%E3%82%81)


+ [x] 環境開発
  + [x] linter
  + [x] formatter
  + [x] github


+ [x] モデリング・DB
  + [x] モデリング再考
  + [x] シード値の埋め込み
    + [x] シード値の埋め込み(参加者側)
    + [x] シード値の埋め込み(課題側)
    + [x] シード値の埋め込みの整形作業
  + [x] SQL考える
 

+ [ ] DDDの実装
  + [ ] ドメイン層
    + [ ] 実装
      + [x] ドメイン層の抽象クラス
      + [x] 参加者集約
        + [ ] 参加者集約ルートを作成する
      + [ ] 課題集約
    + [ ] テスト
      + [x] 参加者集約
      + [ ] 課題集約
      + [x] testで`toBeInstanceOf`
      + [x] testで`toThrowError`
      + [x] utilsのテストをつくる
  + [ ] ユースケース層
    + [ ] 実装
      + [ ] ドメイン層の抽象クラス
      + [ ] 参加者集約
      + [ ] 課題集約
    + [ ] テスト
      + [ ] 参加者集約
      + [ ] 課題集約
  + [ ] リポジトリ層
    + [ ] 実装
      + [ ] ドメイン層の抽象クラス
      + [ ] 参加者集約
      + [ ] 課題集約
    + [ ] テスト
      + [ ] 参加者集約
      + [ ] 課題集約
  + [ ] コントローラー層
    + [ ] Nest.jsのエラーハンドリング


+ [ ] その他
  + [ ] テスト環境切り替えシステム
