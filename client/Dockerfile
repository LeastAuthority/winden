FROM node:16-alpine

WORKDIR /usr/src/app/client

RUN apk add aws-cli git

RUN npm -g config set user root
RUN npm install --global gulp-cli
COPY --from=golang:1.16-alpine /usr/local/go/ /usr/local/go/

# RUN npm install --location=global @sentry/cli

# RUN mkdir -p /usr/src/app/client
# RUN chown -R node:node /usr/src/app/client
# USER node


# RUN mkdir ~/.npm-global
# RUN npm config set prefix ‘~/.npm-global’
#ENV PATH="~/.npm-global/bin:$PATH"
ENV PATH="/usr/local/go/bin:${PATH}"

RUN chown -R "${USER}" /root/.npm

COPY package.json .
COPY package-lock.json .
RUN npm install --location=global --unsafe-perm
COPY . .

EXPOSE 8080
CMD ["gulp", "watch"]