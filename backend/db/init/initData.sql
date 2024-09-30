\copy beers FROM '/docker-entrypoint-initdb.d/beer_profile_and_ratings.csv' CSV HEADER;
