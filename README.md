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

## ここでやらないこと
##### 各エンティティごとに独自のID型を持つこと
##### リポジトリのテストをInMemory上で行うこと
リポジトリのテストは実際にテストDBを持ってやりたい
