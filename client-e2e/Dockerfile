FROM node:16-alpine

WORKDIR /usr/src/app/client-e2e

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "wdio"]