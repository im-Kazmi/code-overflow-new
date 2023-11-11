"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className=" flex justify-between bg-black/20 w-full z-50 gap-5 p-6 sm:px-12">
      <Link href={"/"} className=" flex items-center gap-1">
        <Image
          src=" /assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="CodeOverFlow"
        />
        <p className="text-xl text-white  max-sm:hidden">
          Code <span className="  font-bold text-orange-500">Overflow</span>
        </p>
      </Link>
      <h1>Global Search</h1>
      <div className=" flex gap-7">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
