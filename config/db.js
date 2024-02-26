import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";

async function connect() {
  try {
    dotenv.config({ path: ".env.local" });
    const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
    console.log("Database Connected!");
    return client;
  } catch (e) {
    console.log(e);
    console.log("Database Not Connected");
  }
}
export { api, connect };
