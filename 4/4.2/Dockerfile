FROM node:18

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]