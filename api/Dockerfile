FROM node:14.15.4-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./ 

EXPOSE 5000
