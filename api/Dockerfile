FROM node:14.15.4-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./ ./ 

EXPOSE 5000
