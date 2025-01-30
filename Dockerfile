FROM node:22.13-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22.13-alpine

ENV PORT=8080

COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=build /app/build /app

WORKDIR /app

EXPOSE 8080

CMD ["node", "index.js"]