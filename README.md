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


3. Run project
```
docker-compose up --build
```
4. Visit http://localhost:3000
