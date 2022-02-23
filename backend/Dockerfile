FROM node:16.14
RUN npm i -g @nestjs/cli
RUN npm i -g prisma

WORKDIR /backend-server

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
CMD [ "npm", "run", "prisma","migrate" ,"dev" ]

CMD [ "npm", "run", "start:debug" ]

