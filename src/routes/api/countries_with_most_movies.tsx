import { Handlers } from "$fresh/server.ts";
import { fetch_countries_with_most_movies } from "../../database/mongodb/queries.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const results = await fetch_countries_with_most_movies();
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
