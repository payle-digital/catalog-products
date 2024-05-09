FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env.development ./

RUN npx prisma generate && npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]