# Dockerfile production pour Railway

FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etape finale : Production
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
RUN ls /app
RUN ls /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/views ./views
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.env .env

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
