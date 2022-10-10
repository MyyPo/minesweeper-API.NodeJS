FROM node:16.17.1-bullseye-slim

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 8080
