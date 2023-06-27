FROM node:18.16.0

WORKDIR /var/www/html

COPY ./package*.json ./

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]