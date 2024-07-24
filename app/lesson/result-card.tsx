import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  variant: "points" | "hearts";
  value: number;
};
const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === "points" ? "/heart.svg" : "/points.png";
  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "hearts" && "bg-rose-500 border-rose-500",
        variant === "points" && "bg-orange-400 border-orange-400"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "points" && "bg-orange-400",
          variant === "hearts" && "bg-rose-500"
        )}
      >
        {variant === "points" ? "Total XP" : "hearts"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bol text-lg",
          variant === "points" && "text-orange-400",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          alt={variant === "points" ? "Hearts" : "Points"}
          width={30}
          height={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
