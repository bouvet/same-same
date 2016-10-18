CREATE DATABASE IF NOT EXISTS samesame;
USE samesame;

DROP TABLE IF EXISTS participants;

CREATE TABLE participants (
  email  VARCHAR(100),
  userid BIGINT       NOT NULL,
  name   VARCHAR(100) DEFAULT NULL,
  prize  VARCHAR(1)   NOT NULL,
  winner TINYINT(1)   DEFAULT 0,
  bouvet TINYINT(1)   DEFAULT 0,
  PRIMARY KEY (email)
);