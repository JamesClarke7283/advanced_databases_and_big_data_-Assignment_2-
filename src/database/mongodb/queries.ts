import { connect_mongo_database } from "./database.ts";
import { password } from "../../config.ts";

export async function fetch_average_movie_scores(): Promise<any> {
    const client = connect_mongo_database(password);
    await client.connect();
    const db = client.db("Movies");

    try {
        const result = await db.collection("Movie").aggregate([
            {
                $lookup: {
                    from: "Score_movie",
                    localField: "movieId",
                    foreignField: "movieId",
                    as: "movieScores"
                }
            },
            {
                $unwind: "$movieScores"
            },
            {
                $group: {
                    _id: "$title",
                    averageScore: { $avg: "$movieScores.score" }
                }
            },
            {
                $sort: { averageScore: -1 }
            }
        ]).toArray();

        await client.close();
        return result;
    } catch (error) {
        console.error("Error executing aggregation:", error);
        await client.close();
        throw error;
    }
}


export async function fetch_countries_with_most_movies(): Promise<any> {
    const client = connect_mongo_database(password);
    await client.connect();
    const db = client.db("Movies");

    try {
        const result = await db.collection("Movie").aggregate([
            {
                $group: {
                    _id: { country: "$country", genre: "$genre" },
                    num_movies: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id.country",
                    genre: "$_id.genre",
                    num_movies: "$num_movies"
                }
            },
            {
                $sort: { num_movies: -1 }
            }
        ]).toArray();

        await client.close();
        return result;
    } catch (error) {
        console.error("Error executing aggregation:", error);
        await client.close();
        throw error;
    }
}

export async function fetch_movies_by_genre_and_year(): Promise<any> {
    const client = connect_mongo_database(password);
    await client.connect();
    const db = client.db("Movies");

    try {
        const result = await db.collection("Movie").aggregate([
            {
                $group: {
                    _id: { genre: "$genre", year: "$year" },
                    movieCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    genre: "$_id.genre",
                    year: "$_id.year",
                    movieCount: "$movieCount"
                }
            },
            {
                $sort: {
                    year: -1,
                    genre: 1
                }
            }
        ]).toArray();

        await client.close();
        return result;
    } catch (error) {
        console.error("Error executing aggregation:", error);
        await client.close();
        throw error;
    }
}