FROM node:lts-alpine

WORKDIR /src/

COPY ["*.js,", "*.json", "./"]

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]