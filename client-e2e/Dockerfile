FROM node:lts-alpine

WORKDIR /usr/src/app/client-e2e

RUN apk add bash

ADD start-wdio.sh .

CMD ./start-wdio.sh
