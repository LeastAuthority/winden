FROM node:16-alpine

WORKDIR /usr/src/app/client

RUN apk add git openssh lftp

RUN npm -g config set user root
RUN npm install --global gulp-cli
COPY --from=golang:1.19.3-alpine /usr/local/go/ /usr/local/go/

RUN npm install --location=global @sentry/cli
ENV SENTRYCLI_SKIP_DOWNLOAD=1

ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOROOT="/usr/local/go"

COPY package.json .
COPY package-lock.json .
ARG SENTRYCLI_USE_LOCAL=1
RUN npm install --location=global --unsafe-perm
COPY . .

RUN npm install

CMD ["gulp", "watch"]
EXPOSE 8080
