# Используем официальный образ Node.js
FROM node:18.20-alpine3.20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package*.json yarn.lock ./

# Копируем исходный код приложения
COPY . .

# Устанавливаем nodemon глобально
RUN npm install -g nodemon
RUN yarn set version 4.5.0
RUN yarn install

# Указываем порт, который будет использоваться
EXPOSE 3001

CMD [ "npm", "run", "dev" ]