"use client";
import { links } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky max-sm:hidden max-md:w-fit  flex flex-col justify-between w-60 min-h-screen  bg-black/20">
      <div className="flex flex-col w-full h-full gap-4 px-5 mt-10 ">
        {links.map((link) => (
          <Link
            href={link.route}
            key={link.name}
            className={`flex py-2 max-md:w-fit hover:bg-black/40 w-44 px-2 rounded-xl gap-5  items-center ${
              pathname.includes(link.route)
                ? "bg-gradient-to-r"
                : "bg-transparent"
            }  from-orange-500 to-orange-200 `}
          >
            <span className="text-xl text-white ">{link.Icon}</span>
            <span className="text-white max-md:hidden ">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className=" flex flex-col px-5 gap-2 py-2">
        <Link
          href={"/sign-in"}
          className="flex p-2 cursor-pointer  max-md:w-fit bg-black/40 w-44  rounded-md
           gap-5  items-center text-white "
        >
          Sign In
        </Link>
        <Link
          href={"/sign-up"}
          className="flex p-2 cursor-pointer  max-md:w-fit bg-black/40 w-44 rounded-md
           gap-5  items-center text-white "
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
