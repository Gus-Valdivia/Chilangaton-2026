import express from "express";
import { sql } from "drizzle-orm";
import db from "./db.js";

const app = express();

app.get("/health", async (req, res) => {
    try {
        await db.execute(sql`SELECT 1`);
        res.status(200).json({ success: true, status: "healthy" });
    } catch (e) {
        res.status(500).json({ success: false, status: "unhealthy", error: e });
    }
});

export default app;
