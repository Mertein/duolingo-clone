import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

// Inicialización de la base de datos
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Reseting database...");

    // Borrado de las tablas
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);
    await db.delete(schema.userSubscription);

    console.log('====================================');
    console.log('Resetting finished....');
    console.log('====================================');

    // Inserción de cursos
    const courses = await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/es.svg" },
      { id: 2, title: "English", imageSrc: "/en.svg" },
      { id: 3, title: "French", imageSrc: "/fr.svg" },
      { id: 4, title: "German", imageSrc: "/ger.svg" },
      { id: 5, title: "Japanese", imageSrc: "/jp.svg" },
      { id: 6, title: "Italian", imageSrc: "/it.svg" }
    ]).returning();

    // Inserción de unidades, lecciones y desafíos
    for (const course of courses) {
      const units = await db.insert(schema.units).values([
        { courseId: course.id, title: "Unit 1", description: `Learn the basics of ${course.title}`, order: 1 },
        { courseId: course.id, title: "Unit 2", description: `Learn intermediate ${course.title}`, order: 2 },
        { courseId: course.id, title: "Unit 3", description: `Learn advanced ${course.title}`, order: 3 }
      ]).returning();

      for (const unit of units) {
        const lessons = await db.insert(schema.lessons).values([
          { unitId: unit.id, title: "Nouns", order: 1 },
          { unitId: unit.id, title: "Verbs", order: 2 },
          { unitId: unit.id, title: "Adjectives", order: 3 },
          { unitId: unit.id, title: "Phrases", order: 4 },
          { unitId: unit.id, title: "Sentences", order: 5 },
          { unitId: unit.id, title: "Grammar", order: 6 }
        ]).returning();

        for (const lesson of lessons) {
          const challenges = await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'the man'?", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'the woman'?", order: 2 },
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'the boy'?", order: 3 },
            { lessonId: lesson.id, type: "ASSIST", question: "'the man'", order: 4 },
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'the zombie'?", order: 5 },
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'the robot'?", order: 6 },
            { lessonId: lesson.id, type: "SELECT", question: "Which one of these is 'girl'?", order: 7 },
            { lessonId: lesson.id, type: "ASSIST", question: "'the zombie'", order: 8 },
            { lessonId: lesson.id, type: "ASSIST", question: "Fill in the blank: 'The ___ is running.'", order: 9 }
          ]).returning();

          for (const challenge of challenges) {
            const options = getChallengeOptions(challenge);
            await db.insert(schema.challengesOptions).values(options);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

// Función para obtener las opciones de desafío basadas en el orden
const getChallengeOptions = (challenge: any) => {
  switch (challenge.order) {
    case 1:
      return [
        { challengeId: challenge.id, text: "El hombre", correct: true, imageSrc: '/es_man.png', audioSrc: '/es_man.mp3' },
        { challengeId: challenge.id, text: "La mujer", correct: false, imageSrc: '/es_woman.png', audioSrc: '/es_woman.mp3' },
        { challengeId: challenge.id, text: "El robot", correct: false, imageSrc: '/es_robot.png', audioSrc: '/es_robot.mp3' },
      ];
    case 2:
      return [
        { challengeId: challenge.id, text: "La mujer", correct: true, imageSrc:'/es_woman.png', audioSrc: "/es_woman.mp3" },
        { challengeId: challenge.id, text: "El robot", correct: false, imageSrc:'/es_robot.png', audioSrc: "/es_robot.mp3" },
        { challengeId: challenge.id, text: "El hombre", correct: false, imageSrc:'/es_man.png', audioSrc: "/es_man.mp3" },
      ];
    case 3:
      return [
        { challengeId: challenge.id, text: "La mujer", correct: false, imageSrc:'/es_woman.png', audioSrc: "/es_woman.mp3" },
        { challengeId: challenge.id, text: "El niño ", correct: true, imageSrc:'/es_boy.svg', audioSrc: "/es_boy.mp3" },
        { challengeId: challenge.id, text: "El robot", correct: false,  imageSrc:'/es_robot.png',audioSrc: "/es_robot.mp3" },
      ];
    case 4:
      return [
        { challengeId: challenge.id, text: "La mujer", correct: false, audioSrc: "/es_woman.mp3" },
        { challengeId: challenge.id, text: "El hombre", correct: true,audioSrc: "/es_man.mp3" },
        { challengeId: challenge.id, text: "El robot", correct: false, audioSrc: "/es_robot.mp3" },
      ];
    case 5:
      return [
        { challengeId: challenge.id, text: "El zombie", correct: true,imageSrc:'/es_zombie.svg', audioSrc: "/es_zombie.mp3" },
        { challengeId: challenge.id, text: "El hombre", correct: false,imageSrc:'/es_man.png', audioSrc: "/es_man.mp3" },
        { challengeId: challenge.id, text: "La mujer", correct: false,imageSrc:'/es_woman.png', audioSrc: "/es_woman.mp3" },
      ];
    case 6:
      return [
        { challengeId: challenge.id, text: "El robot", correct: true,imageSrc:'/es_robot.png', audioSrc: "/es_robot.mp3" },
        { challengeId: challenge.id, text: "El zombie", correct: false,imageSrc:'/es_zombie.svg', audioSrc: "/es_zombie.mp3" },
        { challengeId: challenge.id, text: "La mujer", correct: false,imageSrc:'/es_woman.png', audioSrc: "/es_woman.mp3" },
      ];
    case 7:
      return [
        { challengeId: challenge.id, text: "La niña", correct: true,imageSrc:'/es_girl.svg', audioSrc: "/es_girl.mp3" },
        { challengeId: challenge.id, text: "El hombre", correct: false,imageSrc:'/es_man.png', audioSrc: "/es_man.mp3" },
        { challengeId: challenge.id, text: "La mujer", correct: false, imageSrc:'/es_woman.png',audioSrc: "/es_woman.mp3" },
      ];
    case 8:
      return [
        { challengeId: challenge.id, text: "El zombie", correct: true, audioSrc: "/es_zombie.mp3" },
        { challengeId: challenge.id, text: "El robot", correct: false, audioSrc: "/es_robot.mp3" },
        { challengeId: challenge.id, text: "El hombre", correct: false, audioSrc: "/es_man.mp3" },
      ];
    case 9:
      return [
        // TODO: Add apple and watch mp3
        { challengeId: challenge.id, text: "man", correct: true, audioSrc: "/en_man.mp3" },
        { challengeId: challenge.id, text: "apple", correct: false, audioSrc: "/en_apple.mp3" },
        { challengeId: challenge.id, text: "watch", correct: false, audioSrc: "/en_watch.mp3" },
      ];
    default:
      return [];
  }
};

main();
