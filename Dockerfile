# Dockerfile for Railway
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run copy-assets

EXPOSE 3000
CMD ["npm", "start"]
