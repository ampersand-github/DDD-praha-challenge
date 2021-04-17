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
```zsh
cd backend
prisma migrate dev --preview-feature
```

## 今後の方針
+ [x] 簡単なcrud(practice)
+ [ ] モデリング再考
+ [ ] サンプルDB作成
+ [ ] SQL考える
  ss
