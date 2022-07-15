FROM node:16-alpine

WORKDIR /usr/src/app/client

RUN apk add aws-cli git

RUN npm install --global gulp-cli
COPY --from=golang:1.16-alpine /usr/local/go/ /usr/local/go/

RUN npm install --global sentry-cli

USER node

RUN mkdir ~/.npm-global
RUN npm config set prefix ‘~/.npm-global’
ENV PATH="~/.npm-global/bin:$PATH"
ENV PATH="/usr/local/go/bin:${PATH}"

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD ["gulp", "watch"]