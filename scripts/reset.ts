import "dotenv/config";
const {drizzle} = require("drizzle-orm/neon-http");
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {schema});

const main = async () => {
  try {
    console.log("Reseting database...");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions)
    await db.delete(schema.challengesProgress)
    // TODO: Add subscriptions to db schema
    // await db.delete(schema.userSubscriptions)
    console.log('====================================');
    console.log('Resetting finished....');
    console.log('====================================');
  } catch (error) {
      console.error(error);
      throw new Error("Failed to reset the database.");
  }
};

main();