FROM node:16-alpine

WORKDIR /usr/src/app/client

RUN apk add aws-cli git

RUN npm -g config set user root
RUN npm install --global gulp-cli
COPY --from=golang:1.16-alpine /usr/local/go/ /usr/local/go/

RUN npm install --location=global @sentry/cli
ENV SENTRYCLI_SKIP_DOWNLOAD=1


ENV PATH="/usr/local/go/bin:${PATH}"

COPY package.json .
COPY package-lock.json .
ENV SENTRYCLI_USE_LOCAL=1
RUN npm install --location=global --unsafe-perm
COPY . .

EXPOSE 8080
CMD ["gulp", "watch"]