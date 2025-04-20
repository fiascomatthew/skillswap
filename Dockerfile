# Dockerfile production pour Railway

FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etape finale : Production
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
RUN ls /app/public
RUN ls /app/views
RUN ls /app/.env

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env .env

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
