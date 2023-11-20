"use client";
import { links } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className=" ">
      <div className="fixed max-md:hidden  flex flex-col justify-between w-60  max-lg:w-fit max-h-screen min-h-screen bg-black/20 max-lg:bg-transparent">
        <div className="flex flex-col h-full  gap-4 px-5 mt-10  w-fit ">
          {links.map((link) => {
            if (link.route === "/profile") {
              if (userId) {
                link.route = `${link.route}/${userId}`;
              } else {
                return null;
              }
            }
            return (
              <Link
                href={link.route}
                key={link.name}
                className={`flex py-2 max-lg:w-fit hover:bg-black/40 w-44 px-2 rounded-md gap-5  items-center ${
                  (pathname.includes(link.route) && link.route.length > 1) ||
                  pathname === link.route
                    ? "bg-gradient-to-r"
                    : "bg-transparent"
                }  from-orange-500 to-orange-200 `}
              >
                <span className="text-xl text-white ">{link.Icon}</span>
                <span className="text-white max-lg:hidden ">{link.label}</span>
              </Link>
            );
          })}
        </div>
        <div className=" flex flex-col px-5 gap-2 py-2">
          <Link
            href={"/sign-in"}
            className="flex p-2 cursor-pointer  max-md:w-fit bg-black/40 w-44  rounded-md
           gap-5  items-center text-white "
          >
            <span className=" max-lg:hidden ">Sign In</span>
          </Link>
          <Link
            href={"/sign-up"}
            className="flex p-2 cursor-pointer  max-md:w-fit bg-black/40 w-44 rounded-md
           gap-5  items-center text-white "
          >
            <span className=" max-lg:hidden ">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
