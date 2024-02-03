FROM node:16-alpine

# Install some require system packages
RUN apk add git openssh openssl lftp curl rust bash

# Parameters for default user:group
ARG uid=1000
ARG user=appuser
ARG gid=1000
ARG group=appgroup

# Remove exising node user to avoid possible conflict
RUN deluser node && rm -rf /home/node && chown -R root:root /opt

# Add user and group for build and runtime
RUN addgroup -g "${gid}" "${group}" && adduser -D -h /home/${user} -s /bin/bash -G "${group}" -u "${uid}" "${user}"

# Prepare directories
RUN DIRS="/usr/src/app" && \
    mkdir -p ${DIRS} && \
    chown -R ${user}:${group} $DIRS

# Switch to non-root user
USER ${user}

# Install the rust toolchain
WORKDIR /home/${user}
RUN curl --proto '=https' --tlsv1.2 -sSf --output rustup-init \
    https://static.rust-lang.org/rustup/archive/1.26.0/x86_64-unknown-linux-musl/rustup-init \
    && chmod +x rustup-init \
    && ./rustup-init -y --profile minimal \
    && rm -f rustup-init
ENV PATH="/home/${user}/.cargo/bin:${PATH}"

# Install wasm-pack to build the WebAssembly packages
RUN cargo install --version 0.12.1 wasm-pack \
    && rm -rf /home/${user}/.cargo/registry
