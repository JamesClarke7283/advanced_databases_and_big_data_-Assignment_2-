import { Handlers } from "$fresh/server.ts";
import { fetch_adventure_genre_roles } from "../../database/mysql/queries.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const results = await fetch_adventure_genre_roles();
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
