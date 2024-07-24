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
    {
      id: 2,
      title: "Lesson 2",
      unitId: 1,
      order: 2,
    },
    {
      id: 3,
      title: "Lesson 3",
      unitId: 1,
      order: 3,
    },
    {
      id: 4,
      title: "Lesson 4",
      unitId: 1,
      order: 4,
    },
    {
      id: 5,
      title: "Lesson 5",
      unitId: 1,
      order: 5,
    },
   ]);


  //  TODO: Challenge one and two

   await db.insert(schema.challenges).values([
    {
      id: 1,
      lessonId: 1,
      question: "Which one of these is the 'the man'?",
      order: 1, 
      type: "SELECT"
    }, 
    {
      id: 2,
      lessonId: 1,
      question: "the man",
      order: 2, 
      type: "ASSIST"
    }
   ]);
   

   await db.insert(schema.challengesOptions).values([
    {
      challengeId: 1,
      text: "El hombre",
      correct: true,
      image_src: '/es_man.png'
    }, 
    {    
      challengeId: 1,
      text: "La mujer",
      correct: false,
         image_src: '/es_woman.png'
   },
   {
    challengeId: 1,
    text: "El robot",
    correct: false,
       image_src: '/es_robot.png'
   }
   ]);

   await db.insert(schema.challengesOptions).values([
    {
      challengeId: 2,
      text: "El hombre",
      correct: true,
      audioSrc: "/es_man.mp3"
    }, 
    {    
      challengeId: 2,
      text: "La mujer",
      correct: false,
      audioSrc: "/es_woman.mp3"
   },
   {
    challengeId: 2,
    text: "El robot",
    correct: false,
    audioSrc: "/es_robot.mp3"
   }
   ]);


  //  TODO: Challenge three and four
   await db.insert(schema.challenges).values([
    {
      id: 3,
      lessonId: 2,
      question: "Which one of these is the 'the woman'?",
      order: 1, 
      type: "SELECT"
    }, 
    {
      id: 4,
      lessonId: 2,
      question: "The woman",
      order: 2, 
      type: "ASSIST"
    }
   ]);
   
   await db.insert(schema.challengesOptions).values([
    {
      challengeId: 3,
      text: "El hombre",
      correct: false,
      audioSrc: "/es_man.mp3"
    }, 
    {    
      challengeId: 3,
      text: "La mujer",
      correct: true,
      audioSrc: "/es_woman.mp3"
   },
   {
    challengeId: 3,
    text: "El robot",
    correct: false,
    audioSrc: "/es_robot.mp3"
   }
   ]);

   await db.insert(schema.challengesOptions).values([
    {
      challengeId: 3,
      text: "El hombre",
      correct: false,
      image_src: '/es_man.png'
    }, 
    {    
      challengeId: 3,
      text: "La mujer",
      correct: true,
      image_src: '/es_woman.png'
   },
   {
      challengeId: 3,
      text: "El robot",
      correct: false,
      image_src: '/es_robot.png'
   }
   ]);


   


  } catch (error) {
      console.error(error);
      throw new Error("Failed to seed database.");
  }
};

main();