import { FeedWrapper } from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export const quests = [
  {
    title: "Earn 20 px",
    value: 20,
  },
  {
    title: "Earn 50 px",
    value: 50,
  },
  {
    title: "Earn 100 px",
    value: 100,
  },
  {
    title: "Earn 00 px",
    value: 500,
  },
  {
    title: "Earn 1000 px",
    value: 1000,
  },
];

const QuestPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image alt="Quests" src="/quests.svg" width={90} height={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-neutral-500 text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex items-center w-full p-8 gap-x-4 border-t-2"
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};
{
}
export default QuestPage;
