CREATE TABLE IF NOT EXISTS beers (
  name TEXT,
  style TEXT,
  brewery TEXT,
  fullBeerName TEXT,
  description TEXT,
  abv DECIMAL(4,2),
  minIBU INTEGER,
  maxIBU INTEGER,
  astringency INTEGER,
  body INTEGER,
  alcohol INTEGER,
  bitter INTEGER,
  sweet INTEGER,
  sour INTEGER,
  salty INTEGER,
  fruits INTEGER,
  hoppy INTEGER,
  spices INTEGER,
  malty INTEGER,
  review_aroma DECIMAL(6,5),
  review_appearance DECIMAL(6,5),
  review_palate DECIMAL(6,5),
  review_taste DECIMAL(6,5),
  review_overall DECIMAL(6,5),
  number_of_reviews INTEGER
);