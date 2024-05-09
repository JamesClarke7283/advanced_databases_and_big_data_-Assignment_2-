CREATE DATABASE IF NOT EXISTS Movies;

USE Movies;

CREATE TABLE IF NOT EXISTS Country (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(255),
  language VARCHAR(255)
);

INSERT INTO Country (code, name, language) VALUES
('AU', 'Australia', NULL),
('BE', 'Belgium', NULL),
('BR', 'Brazil', NULL),
('BS', 'Bahamas', NULL),
('CA', 'Canada', NULL),
('CH', 'Switzerland', NULL),
('CN', 'China', NULL),
('CZ', 'Czech Republic', NULL),
('DE', 'Germany', 'german'),
('DK', 'Denmark', NULL),
('ES', 'Spain', 'spanish'),
('FR', 'France', 'french'),
('GB', 'United Kingdom', 'english'),
('GR', 'Greece', NULL),
('HK', 'Hong Kong', NULL),
('IE', 'Irlande', 'english'),
('IT', 'Italy', 'italien'),
('JO', 'Jordan', NULL),
('JP', 'Japan', 'japanese'),
('KR', 'South Korea', NULL),
('MX', 'Mexico', NULL),
('NL', 'Netherlands', NULL),
('NO', 'Norway', NULL),
('NZ', 'New Zealand', NULL),
('US', 'USA', 'english');