import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const coursesProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      coursesProgressData,
      lessonPercentageData,
    ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title!} />
        {units.map((unit) => (
          <Unit
            key={unit.id}
            id={unit.id}
            order={unit.order}
            description={unit.description}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={courseProgress?.activeLesson}
            activeLessonPercentage={lessonPercentage}
          />
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
