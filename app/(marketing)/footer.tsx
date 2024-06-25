import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-32 border-t-2 border-slate-200 w-full p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/es.svg"
            width={40}
            height={32}
            alt="Spanish"
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/en.svg"
            width={40}
            height={32}
            alt="English"
            className="mr-4 rounded-md"
          />
          English
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/ger.svg"
            width={40}
            height={32}
            alt="Germany"
            className="mr-4 rounded-md"
          />
          Germany
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/fr.svg"
            width={40}
            height={32}
            alt="France"
            className="mr-4 rounded-md"
          />
          France
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/jp.svg"
            width={40}
            height={32}
            alt="Japanese"
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
      </div>
    </footer>
  );
};
