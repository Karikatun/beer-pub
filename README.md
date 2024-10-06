# BEER-pub app

## Run locally

1. Download database from [site](https://www.kaggle.com/datasets/ruthgn/beer-profile-and-ratings-data-set).
   Unpack and replace file beer_profile_and_ratings.csv it into ./db/init dir
2. To activate the ability to use AI, create .env file in the root directory
```
YANDEX_OAUTH=""
FOLDER_ID=""
```
Fill in [YANDEX_OAUTH](https://yandex.cloud/ru/docs/iam/concepts/authorization/iam-token) and [FOLDER_ID](https://yandex.cloud/ru/docs/resource-manager/operations/folder/get-id#console_1)

3. Create db.env file in the root directory
```
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=beer_pub
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

4. Run project
```
docker-compose up --build
```
5. Visit http://localhost:3000
