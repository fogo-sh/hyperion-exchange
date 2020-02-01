FROM node:12

WORKDIR /app/server/
COPY . /app
RUN cd /app/frontend &&\
    npm install &&\
    npm run build &&\
    cd ../server &&\
    npm install &&\
    npm run build
CMD "node" "dist/index.js"