SELECT DISTINCT a.name, a.surname
FROM Artist a
JOIN Role r ON a.artistId = r.actorId
JOIN Movie m ON r.movieId = m.movieId
WHERE m.genre = 'Adventure'
ORDER BY a.surname, a.name;