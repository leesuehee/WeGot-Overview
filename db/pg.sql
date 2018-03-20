DROP DATABASE IF EXISTS wegotdata;
CREATE DATABASE wegotdata;

\c wegotdata;

CREATE TABLE restaurant (
  ID SERIAL PRIMARY KEY NOT NULL,
  food DECIMAL,
  decor DECIMAL,
  price VARCHAR,
  title VARCHAR NOT NULL,
  tagline VARCHAR,
  dis TEXT
  );
