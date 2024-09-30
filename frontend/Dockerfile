# Stage 1: Build the application
FROM node:18.20-alpine3.20

WORKDIR /app

COPY package*.json yarn.lock ./
COPY . .

RUN yarn set version 4.5.0 \
    && yarn install

# Указываем порт, который будет использоваться
EXPOSE 3000

CMD [ "yarn", "start" ]
