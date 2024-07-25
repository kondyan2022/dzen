FROM node:alpine

# FROM node:20-alpine AS build

# RUN apk add --no-cache make gcc g++ python3 pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev
# RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig
# COPY package.json package-lock.json ./
# RUN npm ci

# FROM node:20-alpine
# RUN apk add --no-cache cairo pango libjpeg-turbo giflib
# COPY --from=build  /node_modules ./node_modules

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]