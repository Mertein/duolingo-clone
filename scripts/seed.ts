import "dotenv/config";
const {drizzle} = require("drizzle-orm/neon-http");
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {schema});

const main = async () => {
  try {
    console.log("Seeding database...");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    console.log("Seeding finished");
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "English",
        imageSrc: "/en.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Germany",
        imageSrc: "/ger.svg",
      },  {
        id: 5,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
      {
        id: 6,
        title: "Italian",
        imageSrc: "/ger.svg",
      },
    ])
  } catch (error) {
      console.error(error);
      throw new Error("Failed to seed database.");
  }
};

main();