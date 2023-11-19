"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/constants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const MobileNav = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className=" w-full  justify-between max-sm:flex">
      <Sheet>
        <SheetTrigger className="">
          <Image
            src={"/assets/icons/hamburger.svg"}
            alt="hamburger"
            width={20}
            height={20}
            className=" text-white"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className=" bg-black/80  w-[260px]">
          <SheetHeader>
            <Link href={"/"} className=" flex items-center gap-1">
              <Image
                src=" /assets/images/site-logo.svg"
                width={23}
                height={23}
                alt="CodeOverFlow"
              />
              <p className="text-xl text-white  max-sm:hidden">
                Code{" "}
                <span className="  font-bold text-orange-500">Overflow</span>
              </p>
            </Link>
          </SheetHeader>
          <SheetDescription className=" flex flex-col justify-between h-full">
            <div className=" flex flex-col gap-3 mt-10">
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
                    className={`flex py-2 w-full hover:bg-black/40  px-2 rounded-md gap-5  items-center ${
                      (pathname.includes(link.route) &&
                        link.route.length > 1) ||
                      pathname === link.route
                        ? "bg-gradient-to-r"
                        : "bg-transparent"
                    }  from-orange-500 to-orange-200 `}
                  >
                    <span className="text-xl text-white ">{link.Icon}</span>
                    <span className="text-white ">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className=" flex flex-col px-5 gap-2 py-2 mb-3 ">
              <Link
                href={"/sign-in"}
                className="flex p-2 w-full cursor-pointer  bg-black/40  rounded-md
           gap-3 items-center text-white "
              >
                Sign In
              </Link>
              <Link
                href={"/sign-up"}
                className="flex p-2 cursor-pointer bg-black/40 w-full rounded-md
           gap-5  items-center text-white "
              >
                Sign Up
              </Link>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
