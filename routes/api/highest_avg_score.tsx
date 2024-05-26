import { Handlers } from "$fresh/server.ts";
import { fetch_highest_avg_score } from "../../database/mysql/queries.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const results = await fetch_highest_avg_score();
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
