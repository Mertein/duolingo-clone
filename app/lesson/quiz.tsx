"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState } from "react";
import Header from "./header";

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

  return (
    <>
      <Header
        percentage={percentage}
        hearts={hearts}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  );
};

export default Quiz;
