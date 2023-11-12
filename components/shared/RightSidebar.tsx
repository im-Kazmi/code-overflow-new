"use client";
import { hotQuestions, links, popularTags } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidChevronRight } from "react-icons/bi";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky flex max-xl:hidden flex-col w-64 min-h-screen  bg-black/20">
      <div className="flex px-3 flex-col w-full mt-5">
        <div className="flex flex-col ">
          <h1 className=" font-bold text-white">Top Questions</h1>
          <div className=" flex flex-col gap-1 mt-5">
            {hotQuestions.map((question) => (
              <Link
                href={"/"}
                className="flex cursor-pointer items-center
             justify-between gap-7 px-2 py-1 rounded-lg hover:bg-black/50"
              >
                <p className=" text-white text-sm">{question.title}</p>
                <span className=" text-white">
                  <BiSolidChevronRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <h1 className=" font-bold text-white">Popular Tags</h1>
          <div className=" flex flex-col gap-1 mt-5">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
                textColor={tag.textColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
