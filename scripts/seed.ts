import "dotenv/config";
const {drizzle} = require("drizzle-orm/neon-http");
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { title } from "process";

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
    ]);

   await db.insert(schema.units).values([
    {
      id: "1",
      title: "Unit 1",
      courseId: 1,
      description: "Unit 1 description",
      order: 1,
    },
    {
      id: "2",
      title: "Unit 2",
      courseId: 1,
      description: "Unit 2 description",
      order: 2,
    }
   ])

   await db.insert(schema.lessons).values([
    {
      id: 1,
      title: "Lesson 1",
      unitId: 1,
      order: 1,
    },
   ]);


   await db.insert(schema.challenges).values([
    {
      id: 1,
      lessonId: 1,
      question: "What is the capital of Spain?",
      order: 1, 
      type: "SELECT"
    }
   ]);

   await db.insert(schema.challengesOptions).values([
    {
      id: 1,
      challengeId: 1,
      text: "Madrid",
      correct: true,
    }, 
    {    
      id: 2,
      challengeId: 1,
      text: "Barcelona",
      correct: false,
   },
   {
    id: 3,
    challengeId: 1,
    text: "Seville",
    correct: false,
   }
   ]);

  } catch (error) {
      console.error(error);
      throw new Error("Failed to seed database.");
  }
};

main();