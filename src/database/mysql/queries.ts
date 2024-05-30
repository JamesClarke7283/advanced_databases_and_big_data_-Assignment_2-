import { connect_mysql_database } from "./database.ts";
import { password } from "../../config.ts";

export async function fetch_adventure_genre_roles() {
  const db = await connect_mysql_database(password);
  const stmt = `
    SELECT DISTINCT a.name, a.surname 
    FROM Artist a 
    JOIN Role r ON a.artistId = r.actorId 
    JOIN Movie m ON r.movieId = m.movieId 
    WHERE m.genre = 'Adventure' 
    ORDER BY a.surname, a.name;
  `;
  const result = await db.query(stmt);  // Ensure you await the query execution
  db.close();
  return result;
}

export async function fetch_genre_country_view() {
  const db = await connect_mysql_database(password);
  const stmt = `
    SELECT c.name AS country, m.genre, COUNT(*) AS num_movies
    FROM Movie m
    JOIN Country c ON m.countryCode = c.code
    GROUP BY c.name, m.genre;
  `;
  const result = await db.query(stmt);  // Ensure you await the query execution
  db.close();
  return result;
}

export async function fetch_highest_avg_score() {
  const db = await connect_mysql_database(password);
  const stmt = `
    SELECT m.title, AVG(sm.score) AS average_score, COUNT(sm.email) AS num_users
    FROM Movie m
    JOIN Score_movie sm ON m.movieId = sm.movieId
    GROUP BY m.movieId, m.title
    ORDER BY average_score DESC
    LIMIT 5;
  `;
  const result = await db.query(stmt);  // Ensure you await the query execution
  db.close();
  return result;
}
