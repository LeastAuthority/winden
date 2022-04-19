FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install --global gulp-cli
RUN npm install
COPY . .

EXPOSE 8080
CMD ["gulp"]