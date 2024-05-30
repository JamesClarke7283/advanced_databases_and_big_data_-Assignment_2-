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
                    from: "score_movie",
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
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error executing aggregation:", error);
        await client.close();
        throw error;
    }
}

export async function fetch_countries_with_most_movies() {
    return "";
}

export async function fetch_movies_by_genre_and_year() {
    return "";
}