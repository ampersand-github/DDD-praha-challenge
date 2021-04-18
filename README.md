# READ ME
DDD

## アプリケーションの始め方
```zsh
cd db
docker-compose up -d

cd ../
cd backend
npm run start:debug
open http://localhost:3000/
```


## Prismaのマイグレーション
`schema.prisma`にmodel追加
```zsh
cd serverSide
prisma migrate dev --preview-feature
```

## 今後の方針
+ [x] 簡単なcrud(practice)
+ [x] github関連、mainとdevに分けて開発をする
+ [x] モデリング再考
+ [ ] サンプルDB作成
+ [ ] SQL考える
+ [ ] githubへ上げて、レビューしてもらう
+ [ ] lintとformatterの設定

## リンク
- [課題36 特大課題：プラハチャレンジをDDDで実装してみる - 全般](https://scrapbox.io/ampersand/%E8%AA%B2%E9%A1%8C36_%E7%89%B9%E5%A4%A7%E8%AA%B2%E9%A1%8C%EF%BC%9A%E3%83%97%E3%83%A9%E3%83%8F%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E3%82%92DDD%E3%81%A7%E5%AE%9F%E8%A3%85%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)
- [モデル図 - プラハチャレンジをDDDで実装してみる - - 全般](https://scrapbox.io/ampersand/%E3%83%A2%E3%83%87%E3%83%AB%E5%9B%B3_-_%E3%83%97%E3%83%A9%E3%83%8F%E3%83%81%E3%83%A3%E3%83%AC%E3%83%B3%E3%82%B8%E3%82%92DDD%E3%81%A7%E5%AE%9F%E8%A3%85%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B_-)
