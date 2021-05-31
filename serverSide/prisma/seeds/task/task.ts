import { v4 as uuid } from 'uuid';
export const taskDataSource = () => {
  return [
    {
      taskId: '99999999-9999-aaaa-aaaa-999999999999',
      taskNo: 1,
      taskName: 'よく使うHTTPヘッダを理解する',
      description:
        'HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 2,
      taskName: 'curlとpostmanに慣れる',
      description:
        '何かAPIに不具合が起きた時、動作確認をしたい時、毎回フロントエンドを操作して症状を再現するのは手間です。',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 3,
      taskName: 'リクエストをパースするWEBサーバを作ってみる',
      description:
        'OSSのレポジトリにエラーを報告すると、エラーを再現する最小限のサンプルを求められることが多々あります。',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 4,
      taskName: 'クッキーを理解する',
      description:
        'クッキーはHTTP誕生初期（HTTP/0.9時代）には存在せず、HTTP1.0から導入された概念です。それまでのHTTP通信は完全にステートレスで、情報の取得(GET)しかできない(POSTやDELETEが存在しなかった)、非常にシンプルなものでした',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 5,
      taskName: 'サードパーティクッキーについて理解する',
      description:
        '広告収益はWEBサービスの重要な資金源です。ユーザーの趣向に合わせて効果的に広告を表示するためには、それまでユーザーがどのようなサイトに訪問したのか、広告配信ネットワークが把握する必要があります。こうした目的によく使われるのが「サードパーティクッキー」です',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 6,
      taskName: 'CORSについて理解する',
      description:
        '昨今フロントエンドとAPIプロセスが分離されたサービス構成が増えています。フロントエンドとバックエンドが異なるプロセスとして起動している場合、「CORS」の仕組みを理解しておかないと、正しく通信が行えません',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 7,
      taskName: 'キャッシュについて理解する',
      description: 'WEBサービスの高速化はキャッシュ無くして成り立ちません',
      taskGroupName: 'WEBの基礎',
    },
    {
      taskId: uuid(),
      taskNo: 8,
      taskName: 'WEBサービスの代表的な脆弱性を理解する',
      description:
        'ブラウザの進化、GitHubによる脆弱性診断（と自動PRの作成）、WEBフレームワークの普及により、そもそもの仕組み的な不備による脆弱性は日々、減少傾向にあります',
      taskGroupName: 'WEBの基礎',
    },

    {
      taskId: uuid(),
      taskNo: 9,
      taskName: 'jestで単体テストを書こう',
      description:
        '品質の高いコードを書く上で、単体テストほど重要な存在はありません',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 10,
      taskName: 'storybookを作ろう',
      description:
        '「Storybook」はフロントエンドの開発でよく用いられるツールで、簡単に言うとフロントエンドのコンポーネントを一覧化した、カタログのような物です',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 11,
      taskName: 'スナップショットテストを書こう',
      description:
        '単体テストは、フロントエンドよりもサーバーサイドに書かれることの方が多いように思います',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 12,
      taskName: 'ビジュアル・リグレッションテストを書こう',
      description:
        '先の課題で作成したスナップショットテストには、ある問題点があります。それは「差分があることは分かるけど、その差分によって表示がどう変化したのか、よく分からない」ことです',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 13,
      taskName: 'E2Eテストを書こう',
      description:
        'ここまではStorybookを用いたテスト（スナップショットテストやビジュアルリグレッションテスト）を書いてきました',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 14,
      taskName: 'TDD（テスト駆動開発）でコードを書いてみる',
      description:
        '先にコードを書いてから単体テストを後で追加する現場の方が多いかと思いますが、単体テストを先に書いてから実装コードを書く「テスト駆動開発」という開発手法があります',
      taskGroupName: 'テスト',
    },
    {
      taskId: uuid(),
      taskNo: 15,
      taskName: 'SQL10本ノック',
      description:
        '普段ORマッパーを使っている人ほど直接 SQL を書いた経験は少ないものですが、ORマッパーが書いている SQL が常に最適とは限りません。',
      taskGroupName: 'DB',
    },
    {
      taskId: uuid(),
      taskNo: 16,
      taskName: 'インデックスを理解する',
      description:
        'ディスクへの書き込みや呼び出しはメモリ上に展開されたアプリケーションの実行に比べてはるかに遅いため、一般的なウェブアプリケーションにおいてデータベースは処理のボトルネックになりがちです',
      taskGroupName: 'DB',
    },
    {
      taskId: uuid(),
      taskNo: 17,
      taskName: '複合インデックスを理解する',
      description:
        '注意：１つのカラムに対して作成するインデックスを今後「インデックス」と呼びます。複合インデックスとは区別して使っておりますので、ご注意ください',
      taskGroupName: 'DB',
    },
    {
      taskId: uuid(),
      taskNo: 18,
      taskName: 'スロークエリを理解する',
      description:
        '一つ前の課題で「全てのクエリに闇雲にインデックスを作成するのはよくない」ことを学びました',
      taskGroupName: 'DB',
    },
    {
      taskId: uuid(),
      taskNo: 20,
      taskName: 'データベースにおけるNULLの扱い\n',
      description:
        '一般的なプログラミング言語とデータベースに用いられる SQL における NULL の扱いは異なることがあります',
      taskGroupName: 'DB',
    },
    {
      taskId: uuid(),
      taskNo: 21,
      taskName: 'ランザクションについて理解する',
      description:
        'トランザクションはデータベースの世界で特に重要で、かつ体感しづらい概念です',
      taskGroupName: 'DB',
    },
  ];
};
