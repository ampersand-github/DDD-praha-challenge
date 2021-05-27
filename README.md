# READ ME
DDD

## Docker
```zsh
cd db
docker-compose up -d
```

## Nest.js
`npm run start:debug`

## Prisma
##### モデルのマイグレーション
`schema.prisma`を修正後、以下を実施  
`npm run db:migration:model`

##### シード値のマイグレーション
`npm run db:migration:seed`


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
  + [x] ドメイン層
    + [x] 実装
      + [x] ドメイン層の抽象クラス
      + [x] 参加者集約
      + [x] 課題集約
    + [x] テスト
      + [x] 参加者集約
      + [x] 課題集約
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
      + [ ] 参加者集約
      + [ ] 課題集約
    + [ ] テスト
      + [ ] 参加者集約
      + [ ] 課題集約
  + [ ] コントローラー層
    + [ ] Nest.jsのエラーハンドリング


+ [ ] その他
  + [ ] テスト環境切り替えシステム
  + [x] タスクの集約ルート化
  + [ ] ドメインの集約
  + [x] リポジトリ調整
  + [ ] モデル図修正
  + [x] sharedのディレクトリ構成再考
  + [ ] `Jest did not exit one second after the test run has completed.`
  + [x] リポジトリテスト微調整
  + [ ] jest でerror起こす
  + [ ] 集約に合わせたディレクトリ設計
