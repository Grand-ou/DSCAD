FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app
COPY ./ /app

EXPOSE 7777

RUN npm install

CMD ["node", "app.js"]

