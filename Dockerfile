FROM node:14-alpine as build

WORKDIR /app
EXPOSE 3000

COPY . /app/
RUN npm install -g serve expo

RUN npm install
RUN npm run build


CMD ["serve", "-s", "web-build"]

