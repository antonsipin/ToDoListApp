FROM node:18

ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm run build
RUN npm run server:ci
RUN npm run db:migrate

EXPOSE 3100

CMD [ "npm", "start" ]