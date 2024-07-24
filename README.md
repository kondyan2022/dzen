# dZEN code. Тестовое задание

Проект развернут [https://dzen-test-0anj.onrender.com/](https://dzen-test-0anj.onrender.com/)

Репозиторий содержит Backend и Frontend части проекта.

### Frontend:

    React на Vite

### Backend:

    Node, Express, Socket, Sequelize, Postgres, Redis.

Структуру БД в корневой пакпке. файл 'DBModel.mwb'

Все собрано в единый Docker контейнер.

## Подготовка к установке

Установите Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Последовательность установки

1. Клонируйте репозитрий:

   ```bash
   https://github.com/kondyan2022/dzen.git
   ```

2. Перейдите в папку репозитория:
   ```bash
   cd dzen
   ```
3. Создайте `.env` файл согласно примера `.env.example` в корневой папке проекта
4. Перейдите в папку Frontend части репозитория :
   ```bash
   cd dzen-front
   ```
   и также создайте `.env` файл согласно примера `.env.example` в этой папке.
   В папке Backend части создавать `.env` не нужно.
5. Вернитесь в корневую папку проекта

```bash
   cd ..
```

6. Соберите и запустите образы Docker
   ```bash
   docker-compose up --build
   ```
7. Запущенные контейнеры можно увидеть с помощью команды
   ```bash
   docker ps
   ```

#### Прекратить работу контейнеров

```bash
   docker-compose down
```

## Адреса для доступа

После установки и запуска локально, Frontend доступен на

```
http://localhost:8080
```

Backend, на

```
http://localhost:3000
```

## Backend endpoints

### 1. Получить капчу

- Method: `POST`
- URL: `http://localhost:3000/captcha`
- Response status: `201 OK`
- Response Payload:
  ```
  {uuid: string, image: "data:image/png;base64,..."}
  ```
  Капча валидна 2 минуты

### 2. Проверить ответ на капчу

- Method: `POST`
- URL: `http://localhost:3000/captcha/check`
- Body
  ```json
  { "uuid": "string", "text": "string" }
  ```
- Response status: `201 OK`
- Response Payload:
  ```json
  {
    "token": "string"
  }
  ```
  Токен валидный 10 секунд

### 3. Создать сообщение

- Method: `POST`
- URL: `http://localhost:3000/posts`
- Header
  Content-Type: multipart/form-data;
  Authorization: Bearer token
- Body:
  ```json
  {
    "username": "string",
    "email": "string",
    "homepage": "string",
    "parentId": "number",
    "text": "string",
    "file": "file"
  }
  ```
- Response status: `201 OK`
- Response Payload:
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "homepage": "string",
    "parentId": "number",
    "MessageText": "string",
    "attachedFile": "file",
    "updatedAt": "2024-04-25T16:24:26.490Z",
    "createdAt": "2024-04-25T16:24:26.490Z"
  }
  ```

### 4. получить список корневых постов

- Method: `GET`
- URL: `http://localhost:3000/posts?field=username&direction=DESC&page=2&limit=25`
- Query параметры необязательны
- Response status: `200 OK`
- Response Payload:
  ```json
  {
    "limit":25,
    "page":2,
    "pageCount":2,
    "postCount":7,
    "sort": {"field": "createdAt", "direction": "DESC"},
    "posts":[{"id": 5, "parentId": null, "userId": 4, "messageText": "Hello World s", "attachedFile": "1212-2323.jpg", ...}
    ]
  }
  ```

### 4. получить список корневых постов

- Method: `GET`
- URL: `http://localhost:3000/posts?field=username&direction=DESC&page=2&limit=25`
- Query параметры необязательны
- Response status: `200 OK`
- Response Payload:
  ```json
  {
    "limit":25,
    "page":2,
    "pageCount":2,
    "postCount":7,
    "sort": {"field": "createdAt", "direction": "DESC"},
    "posts":[{"id": 5, "parentId": null, "userId": 4, "messageText": "Hello World s", "attachedFile": "1212-2323.jpg", ...}...
    ]
  }
  ```

### 5. Получить список постов по родителю

- Method: `GET`
- URL: `http://localhost:3000/posts/:id`
- В Params передается id родителя
- Response status: `200 OK`
- Response Payload:
  ```json
  [{"id": 5,
  "parentId": 2,
  "userId": 4,
  "messageText": "Hello World s",
  "attachedFile": "1212-2323.jpg", ...}...
    ]
  ```
