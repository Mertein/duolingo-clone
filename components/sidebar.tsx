"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
  CircuitBoard,
  HomeIcon,
  Loader,
  ShieldQuestionIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex bg-flue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 flex-col ",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-8 pb-7 flex items-center gap-x-3">
          <Image src="/duck.png" alt="Mascot Logo" width={40} height={40} />
          <h1 className="text-2xl font-extrabold  text-green-600  tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" icon={HomeIcon} href="/learn" />
        <SidebarItem
          label="LeaderBoard"
          icon={CircuitBoard}
          href="/leaderboard"
        />
        <SidebarItem label="Quests" icon={ShieldQuestionIcon} href="/quests" />
        <SidebarItem label="Shop" icon={ShoppingBagIcon} href="/shop" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
