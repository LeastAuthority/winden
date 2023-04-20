FROM node:16-alpine

WORKDIR /usr/src/app/client

RUN apk add git openssh lftp curl rust

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

RUN npm -g config set user root

RUN npm install --location=global @sentry/cli
ENV SENTRYCLI_SKIP_DOWNLOAD=1

COPY package.json .
COPY package-lock.json .
ARG SENTRYCLI_USE_LOCAL=1
RUN npm install --location=global --unsafe-perm
COPY . .

RUN npm install

CMD ["npm", "run", "serve"]
EXPOSE 8080
