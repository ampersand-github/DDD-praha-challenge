# lts は long term supportの略
# ltsでかつ軽量なものを選んだ
# FROM node:lts-stretch-slim
FROM node:lts
RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY env ./
RUN npm install
COPY prisma ./prisma

CMD [ "npm", "run", "db:migration:model" ]
CMD [ "npm", "run", "start" ]
