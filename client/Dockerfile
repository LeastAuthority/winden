FROM node:16-alpine

# Install some require system packages
RUN apk add git openssh openssl lftp curl rust bash

# Switch to the existing node user instead of root
USER node

# Install latest rust on top of it
# FIXME: make it reproducible!
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/home/node/.cargo/bin:${PATH}"

# Install wasm-pack to build the WebAssembly packages
# FIXME: make it reproducible!
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Switch to the parent directory of where the client code will live
# So the modules installed here will be found by the module resolution
# See https://nodejs.org/api/modules.html#all-together
WORKDIR /usr/src/app

RUN npm install @sentry/cli && \
    npm cache clean --force 2> /dev/null
ENV SENTRYCLI_SKIP_DOWNLOAD=1
ARG SENTRYCLI_USE_LOCAL=1

# Install the required packages globaly and unsafely
COPY package.json .
COPY package-lock.json .
RUN npm clean-install && \
    npm cache clean --force 2> /dev/null

# Add paths to node modules installed above
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

# Switch to the directory where the client code will live
WORKDIR /usr/src/app/client

# Copy the whole context except what is explicitly ignored
# TODO: be explicit instead?
COPY . .

# Start the dev server by default
CMD ["npm", "run", "serve"]
EXPOSE 8080
