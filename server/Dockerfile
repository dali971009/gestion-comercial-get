FROM node:18-alpine

RUN apk add --no-cache git openssh-client

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm ci --only=production
COPY . .
