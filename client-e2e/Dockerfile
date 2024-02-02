FROM node:16-alpine

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

# Switch to the directory where the client code will live
WORKDIR /usr/src/app/client-e2e

# Install the required packages... But not really?
# FIXME: do it or get rid of this block
COPY package.json .
COPY package-lock.json .
#RUN npm install

# Copy the whole context except what is explicitly ignored
# TODO: be explicit instead?
COPY . .

# Start the dev server by default
CMD ["npm", "run", "wdio"]
