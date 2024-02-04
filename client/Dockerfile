# Start from the official Rust image
FROM rust:1.75.0-alpine3.18@sha256:d4d3ccbfb49d4119c748144b2767966a8a3361ee9c529e8fcfa1fa9adfbc9cf5 as builder

# Install component 'rust-std' for 'wasm32-unknown-unknown'
# FIXME: validate downloaded content with checksum
RUN wget -q -O - https://static.rust-lang.org/dist/rust-std-${RUST_VERSION}-wasm32-unknown-unknown.tar.gz \
    | gunzip | tar -x --strip-components 4 -C /usr/local/rustup/toolchains/${RUST_VERSION}-x86_64-unknown-linux-musl/lib/rustlib \
    rust-std-${RUST_VERSION}-wasm32-unknown-unknown/rust-std-wasm32-unknown-unknown/lib/rustlib/wasm32-unknown-unknown

# Install wasm-pack to build the WebAssembly package
# FIXME: validate downloaded content with checksum
RUN WASM_PACK_VERSION=0.12.1 \
    && wget -q -O - https://github.com/rustwasm/wasm-pack/releases/download/v${WASM_PACK_VERSION}/wasm-pack-v${WASM_PACK_VERSION}-x86_64-unknown-linux-musl.tar.gz \
    | gunzip | tar -x --strip-components 1 -C /usr/local/cargo/bin \
    wasm-pack-v${WASM_PACK_VERSION}-x86_64-unknown-linux-musl/wasm-pack

# Switch to the official NodeJS image
FROM node:16-alpine3.18@sha256:a1f9d027912b58a7c75be7716c97cfbc6d3099f3a97ed84aa490be9dee20e787

# Install some require system packages
RUN apk add git openssh openssl lftp curl gcc musl-dev bash

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

# Copy the rust toolchain from the builder stage
COPY --chown=${user}:${group} --from=builder /usr/local/rustup /home/${user}/.rustup
ENV RUSTUP_HOME=/home/${user}/.rustup

# Copy the wasm-pack from the builder stage
COPY --chown=${user}:${group} --from=builder /usr/local/cargo /home/${user}/.cargo
ENV CARGO_HOME=/home/${user}/.cargo
ENV PATH="${CARGO_HOME}/bin:${PATH}"

# Switch to non-root user
USER ${user}
