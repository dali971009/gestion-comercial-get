FROM node:18-alpine

RUN apk add --no-cache git openssh-client

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

# RUN npm install
COPY . .
RUN npm run build
