import {cache} from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challenges, challengesProgress, courses, lessons, units, userProgress } from "./schema";
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

export const getCourseProgress = cache(async () => {
  const {userId} = await auth();
  const userProgress = await getUserProgress();

  if(!userId || !userProgress?.activeCourseId) {
    return null;
  };

  const unitsActiveCourse = await db.query.units.findMany({
    orderBy: (units, {asc}) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, {asc}) => [asc(lessons.order)],
        with: {
          unit: true,
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

  const firstUncompletedLesson = unitsActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return !challenge.challengesProgress || challenge.challengesProgress.length === 0 || challenge.challengesProgress.some((progress) => progress.completed === false);
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const {userId}= await auth();
  const courseProgress = await getCourseProgress();


  const lessonId = id || courseProgress?.activeLessonId;
  if(!lessonId || !userId) {
    return null;
  };

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      unit: true,     challenges: {
        orderBy: (challenges, {asc}) => [asc(challenges.order)],
        with: {
          challengesOptions: true,
          challengesProgress: {
            where: eq(challengesProgress.userId, userId),
          }
        }
      }
    }
  });

  if(!data || !data.challenges) {
    return null;
  };

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed = 
      challenge?.challengesProgress && challenge?.challengesProgress.length > 0 
      && challenge?.challengesProgress.every((progress) => progress.completed);


    return {...challenge, completed};
  })

  return {...data, challenges: normalizedChallenges}; 

});

export const getLessonPercentage = cache(async() => {
  const courseProgress = await getCourseProgress();
  if(!courseProgress?.activeLessonId) {
    return 0;
  };
  const lesson = await getLesson(courseProgress.activeLessonId);

  if(!lesson) {
    return 0;
  };

  const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
  const percentage = Math.round(completedChallenges.length / lesson.challenges.length) * 100;
  return percentage;
})