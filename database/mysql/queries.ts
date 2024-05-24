import { connect_database } from "./database.ts";
import { password } from "../../config.ts";

export async function fetch_adventure_genre_roles(){
  const db = await connect_database(password);
  const stmt = "SELECT DISTINCT a.name, a.surname FROM Artist a JOIN Role r ON a.artistId = r.actorId JOIN Movie m ON r.movieId = m.movieId WHERE m.genre = 'Adventure' ORDER BY a.surname, a.name;";
  const result = db.query(stmt);
  db.close();
  return result;
}
