FROM node:16-alpine

WORKDIR /

COPY . .

RUN npm ci

RUN npm run dev