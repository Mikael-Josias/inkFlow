FROM node:18.16.0

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]