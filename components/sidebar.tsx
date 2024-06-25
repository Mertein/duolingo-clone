import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex bg-flue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 flex-col bg-blue-500",
        className
      )}
    >
      Sidebar
    </div>
  );
};
