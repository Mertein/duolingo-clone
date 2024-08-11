import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "../quiz";

type Props = {
  params: {
    lessondId: number;
  };
};

export default async function LessonIdPage({ params }: Props) {
  const lessonData = await getLesson(params.lessondId);
  const userProgressData = await getUserProgress();
  const userSubscriptionData = await getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    return redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialPercentage={initialPercentage}
      initiaLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialessonId={lesson.id}
      userSubscription={userSubscription}
    />
  );
}
