FROM node:16.14

RUN npm i -g @nestjs/cli
RUN npm i -g prisma

WORKDIR /backend-server

# contextからの相対パス
COPY package*.json ./
RUN npm install

# contextからの相対パス
COPY prisma ./prisma
CMD [ "npm", "run", "prisma","migrate" ,"dev" ]

CMD [ "npm", "run", "start:debug" ]

