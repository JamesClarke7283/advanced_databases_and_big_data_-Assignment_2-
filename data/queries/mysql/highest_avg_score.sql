SELECT m.title, AVG(sm.score) AS average_score, COUNT(sm.email) AS num_users
FROM Movie m
JOIN Score_movie sm ON m.movieId = sm.movieId
GROUP BY m.movieId, m.title
ORDER BY average_score DESC
LIMIT 5;