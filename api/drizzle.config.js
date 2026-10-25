import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL ?? "";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema*.js",
    dialect: "postgresql",
    dbCredentials: {
        url: dbUrl,
    },
});
