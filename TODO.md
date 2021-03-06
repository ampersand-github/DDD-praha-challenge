
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


+ [x] DDDの実装
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
  + [x] ユースケース層
    + [x] 実装
      + [x] ドメイン層の抽象クラス
      + [x] 参加者集約
      + [x] 課題集約
    + [x] テスト
      + [x] 参加者集約
      + [x] 課題集約
  + [x] リポジトリ層
    + [x] 実装
      + [x] 参加者集約
      + [x] 課題集約
      + [x] ペア集約
    + [x] テスト
      + [x] 参加者集約
      + [x] 課題集約
      + [x] ペア集約   
  + [x] コントローラー層
    + [x] 参加者集約
    + [x] 課題集約
    + [x] ペア集約


+ [x] その他
  + [x] ~~テスト環境切り替えシステム~~ ← 今回は練習がてら側だけつくる。
  + [x] タスクの集約ルート化
  + [x] ドメインの集約
  + [x] リポジトリ調整
  + [x] モデル図修正
  + [x] sharedのディレクトリ構成再考
  + [x] リポジトリテスト微調整
  + [x] jestでerror起こす
  + [x] 集約に合わせたディレクトリ設計
  + [x] ドメインオブジェクトの等価比較で`===`としているのを`equal`に改める(等価比較の再考)
  + [x] prismaClient.tsから読み込むのではなく、コンストラクタで受け取ってプロパティに設定する
  + [x] すべてのドメインオブジェクトの`return this`をやめたい
  + [x] ドメイン貧血症検討
  + [x] converterを小分けにする

- 今回やらないこと
  - dotenvで開発環境と本番環境を入れ替えること
  - seed設定 
  - taskIdとidみたいな表記のズレを一致させること -> 面倒くさい
  - チーム集約の作成(ペアとやっていることがほぼ同じなため、ここをやらずに作業量をへらす。)
