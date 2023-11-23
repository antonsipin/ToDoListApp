FROM node:18

ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 3100

CMD [ "npm", "start" ]