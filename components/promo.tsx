import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" width={26} height={26} alt="Pro" />
          <h3 className="text-lg font-bold ">Upgrade to Pro</h3>
        </div>
        <p className="text-neutral-200">Get unlimited hearts and more!</p>
      </div>
      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href="/shop">Upgrade Today.</Link>
      </Button>
    </div>
  );
};

export default Promo;
