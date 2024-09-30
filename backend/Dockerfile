# Используем официальный образ Node.js
FROM node:18.20-alpine3.20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
# RUN apk add --no-cache --virtual .gyp python3 make g++ \
#     && npm install \
#     && apk del .gyp

# Устанавливаем nodemon глобально
RUN npm install -g nodemon \
    && npm install

# Копируем исходный код приложения
COPY . .

# Указываем порт, который будет использоваться
EXPOSE 3001

# Определяем команду запуска приложения
CMD [ "npm", "run", "dev" ]
