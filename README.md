# READ ME
DDD

## テストの実行方法
###### db起動
```zsh
cd db
docker-compose up -d
```
###### Nest.js起動
`npm run start:debug`
###### テスト
`npm run start:debug`


## Prisma
##### モデルのマイグレーション
`schema.prisma`を修正後、以下を実施  
`npm run db:migration:model`

## ここでやらないこと
##### 各エンティティごとに独自のID型を持つこと
##### リポジトリのテストをInMemory上で行うこと
リポジトリのテストは実際にテストDBを持ってやりたい
#### チーム集約はつくらない
ペアとやっていることがほぼ同じなため、ここをやらずに作業量をへらす。  
