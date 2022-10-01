FROM node:16

WORKDIR /app

COPY package-lock.json .
COPY . .

RUN npm ci

CMD ["npm", "start"]
