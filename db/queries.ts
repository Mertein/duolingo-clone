import {cache} from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengesProgress, courses, lessons, units, userProgress } from "./schema";
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
})

export const getUserProgress = cache(async () => {
  const {userId} = auth();
  if(!userId){
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })
  return data;
})

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
  // TODO: Populate units and lessons
  return data;
});

export const getUnits = cache(async () => {
  const {userId} = await auth();
  const userProgress = await getUserProgress();

  if(!userId || !userProgress?.activeCourseId) {
    return [];
  };

  // TODO: Confirm wheter order is needed
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengesProgress: {
                where: eq(challengesProgress.userId, userId),
              }
            }
          }
        }
      }
    }
  });
  const normalizeData = data.map((unit) => {
    const lessonsWithCompleteStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengesProgress && challenge.challengesProgress.length > 0 
              && challenge.challengesProgress.every((progress) => progress.completed);
      });
      return {...lesson, completed: allCompletedChallenges};
    });
    return {...unit, lessons: lessonsWithCompleteStatus};
  });

  return normalizeData;
});