FROM node:lts-alpine
COPY package.json .
RUN npm install
RUN npm run build
COPY . .
ENTRYPOINT node build/server.js