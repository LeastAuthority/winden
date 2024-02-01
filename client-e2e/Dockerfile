FROM node:16-alpine

# Switch to the existing node user instead of root
USER node

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
