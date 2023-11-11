"use client";
import { links } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky max-sm:hidden flex flex-col w-64 min-h-screen  bg-black/20">
      <div className="flex flex-col w-full h-full gap-4 px-5 mt-10 ">
        {links.map((link, index) => (
          <Link
            href={link.route}
            key={link.name}
            className={`flex py-2 cursor-pointer hover:bg-black/40 w-44 px-2 rounded-xl gap-5  items-center ${
              pathname.includes(link.route)
                ? "bg-gradient-to-r"
                : "bg-transparent"
            }  from-orange-600 to-orange-500 to-orange-400  to-white/80`}
          >
            <span className="text-xl text-white ">{link.Icon}</span>
            <span className="text-white ">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
