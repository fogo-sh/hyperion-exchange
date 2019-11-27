FROM node:12

WORKDIR /app
COPY . /app
RUN npm install && npm run build
CMD "node" "dist/index.js"