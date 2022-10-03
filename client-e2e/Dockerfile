FROM node:16-alpine

WORKDIR /usr/src/app/client-e2e

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN ls -al .
COPY . .

RUN ls -al .
CMD ["npm", "run", "wdio"]