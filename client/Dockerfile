FROM node:16-alpine

# Switch to the directory where the client code will live
WORKDIR /usr/src/app/client

# Install some require system packages
RUN apk add git openssh openssl lftp curl rust bash

# Install latest rust on top of it
# FIXME: make it reproducible!
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install wasm-pack to build the WebAssembly packages
# FIXME: make it reproducible!
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Workaround permission issues
RUN npm -g config set user root

# Install the sentry node package globaly
RUN npm install --location=global @sentry/cli
ENV SENTRYCLI_SKIP_DOWNLOAD=1
ARG SENTRYCLI_USE_LOCAL=1

# Install the required packages globaly and unsafely
COPY package.json .
COPY package-lock.json .
RUN npm install --location=global --unsafe-perm

# Copy the whole context except what is explicitely ignored
COPY . .

# Install the required pages again, but localy this time
RUN npm install

# Start the dev server by default
CMD ["./node_modules/.bin/ts-node", "./scripts/devserver.ts"]
EXPOSE 8080
