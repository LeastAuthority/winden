FROM node:lts-alpine

WORKDIR /usr/src/app/client

RUN apk add bash git openssh lftp

RUN npm install --global gulp-cli
RUN npm install --global prettier

COPY --from=golang:1.19.3-alpine /usr/local/go/ /usr/local/go/

ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOROOT="/usr/local/go"

ADD start-gulp.sh .

CMD ./start-gulp.sh

EXPOSE 8080
