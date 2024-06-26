"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { LucideIcon, LucideProps } from "lucide-react";

type Props = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const SidebarItem = ({ label, icon: Icon, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Icon className="h-6 w-6 mr-2" />
        {label}
      </Link>
    </Button>
  );
};
