import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type Props = {
  description: string;
  title: string;
  order: number;
  id: number;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const Unit = ({
  description,
  title,
  order,
  id,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              index={index}
              percentage={activeLessonPercentage}
              totalCount={lessons.length - 1}
              locked={isLocked}
              current={isCurrent}
              key={lesson.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
