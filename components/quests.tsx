import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Quests = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href="/quest">
          <Button variant="primaryOutline" size="sm">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Quests;
