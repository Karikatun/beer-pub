\copy beers FROM '/docker-entrypoint-initdb.d/beer_profile_and_ratings.csv' CSV HEADER;

ALTER TABLE beers
ADD COLUMN id SERIAL PRIMARY KEY;
