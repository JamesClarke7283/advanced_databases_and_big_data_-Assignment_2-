CREATE VIEW GenreCountry AS
SELECT c.name AS country, m.genre, COUNT(*) AS num_movies
FROM Movie m
JOIN Country c ON m.countryCode = c.code
GROUP BY c.name, m.genre;