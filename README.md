# BEER-pub app

## Run locally

1. Download database from [site](https://www.kaggle.com/datasets/ruthgn/beer-profile-and-ratings-data-set).
   Unpack and replace file beer_profile_and_ratings.csv it into backend/db/init dir
2. Run project (backend)
```
cd backend
docker-compose up --build
```

3. Run frontend
```
cd frontend
yarn install
yarn start
```
