FROM node:16.20.0-alpine

RUN apk add g++ make py3-pip

COPY . .

RUN npm install

CMD ["npm", "run","start"]