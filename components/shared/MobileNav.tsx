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

const MobileNav = () => {
  return (
    <div className=" w-full flex justify-between hidden max-sm:flex">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/assets/icons/hamburger.svg"}
            alt="hamburger"
            width={20}
            height={20}
            className=" text-white"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className=" bg-black  w-[300px]">
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
          <SheetDescription className=" flex flex-col justify-around bg-transparent">
            <div className=" flex flex-col gap-3 mt-10">
              {links.map((link, index) => (
                <div className=" flex py-3 w-full px-2 rounded-xl gap-5  items-center bg-gradient-to-r from-orange-500 to-orange-200 ">
                  <span className=" text-xl text-white">{link.Icon}</span>
                  <span className=" text-white">{link.label}</span>
                </div>
              ))}
            </div>
            {/* <div className="flex flex-col ">
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 flex justify-center to-orange-500 to-orange-400  to-white/80 ">
                SignIn
              </button>
            </div> */}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
