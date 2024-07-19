import Image from "next/image";

type Props = {
  question: string;
};
const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        width={60}
        height={60}
        src="/mascot.png"
        className="hidden lg:block"
        alt="Mascot"
      />

      <Image
        width={40}
        height={40}
        src="/mascot.png"
        className="block lg:hidden"
        alt="Mascot"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
