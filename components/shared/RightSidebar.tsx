/* eslint-disable no-unused-vars */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidChevronRight } from "react-icons/bi";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.actions";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();

  return (
    <div className="sticky flex max-xl:hidden flex-col w-64 min-h-screen  bg-black/20">
      <div className="flex px-3 flex-col w-full mt-5">
        <div className="flex flex-col ">
          <h1 className=" font-bold text-white">Top Questions</h1>
          <div className=" flex flex-col gap-1 mt-5">
            {hotQuestions &&
              hotQuestions?.length > 0 &&
              hotQuestions.map((question: any) => (
                <Link
                  href={`/question/${question._id}`}
                  key={question.id}
                  className="flex w-full cursor-pointer
              gap-7 px-1 py-1 rounded-md hover:bg-black/50"
                >
                  <p className=" text-white text-sm">{question.title}</p>
                  {/* <span className=" text-white">
                  <BiSolidChevronRight />
                </span> */}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <h1 className=" font-bold text-white">Popular Tags</h1>
          <div className=" flex flex-col gap-1 mt-5">
            {popularTags &&
              popularTags.map((tag) => (
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
