"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState } from "react";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

type Props = {
  initialPercentage: number;
  initiaLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengesOptions: (typeof challengesOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialessonId: number;
  userSubscription: any; //TODO: Replace with subscription db type
};

const Quiz = ({
  initialPercentage,
  initiaLessonChallenges,
  initialHearts,
  initialessonId,
  userSubscription,
}: Props) => {
  const [hearts, setHears] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initiaLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengesOptions ?? [];
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  const onSelected = (id: number) => {
    if (status === "none") return;
    setSelectedOption(id);
  };

  return (
    <>
      <Header
        percentage={percentage}
        hearts={hearts}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelected}
                status={status}
                selectedOption={1}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={() => {}}
      ></Footer>
    </>
  );
};

export default Quiz;
