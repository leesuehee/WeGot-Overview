DROP DATABASE IF EXISTS wegotdata;
CREATE DATABASE wegotdata;

\c wegotdata;

CREATE TABLE restaurant (
  ID SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR,
  zagatfood DECIMAL,
  zagatdecor DECIMAL,
  zagatservice DECIMAL,
  typeof VARCHAR,
  pricelevel VARCHAR,
  tagline VARCHAR,
  vicinity VARCHAR,
  longdescription TEXT
  )
