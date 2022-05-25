FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

CMD ["npm", "run", "wdio"]