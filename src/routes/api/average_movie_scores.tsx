import { Handlers } from "$fresh/server.ts";
import { fetch_average_movie_scores } from "../../database/mongodb/queries.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const results = await fetch_average_movie_scores();
      console.log(results);
      return new Response(JSON.stringify({ data: results }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
