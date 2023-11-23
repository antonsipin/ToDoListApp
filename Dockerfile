FROM node:18

ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm run build
RUN npm run server:ci

EXPOSE 3100

CMD [ "npm", "start" ]