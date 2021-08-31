# READ ME
praha-challenge-DDD

## Prisma
##### モデルのマイグレーション
`schema.prisma`を修正後、以下を実施  
`npm run db:migration:model`

## テストの実行方法
###### db(docker)起動
```zsh
cd db
docker-compose up -d
```

###### Nest.js起動
`npm run start:debug`

###### テスト
`npm run test`
DBとコントローラーのテストも含まれるので、
テストをするためにNest.jsとprismaとDBを起動していること。




