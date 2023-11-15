import Answer from "@/components/forms/Answer";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BiSolidMessageAltDetail } from "react-icons/bi";

const QuestionDetail = async ({ params }: { params: Params }) => {
  const { id } = params;

  const question = await getQuestionById({ id });

  return (
    <div className="flex flex-col w-full mt-5">
      <div className=" flex gap-3">
        <Image
          src={question.author.picture}
          width={40}
          height={40}
          alt={question.author.name}
          className=" rounded-full"
        />
        <h1 className=" text-neutral-300 my-auto font-semibold">
          {question.author.name}
        </h1>
      </div>
      <p className=" text-2xl font-bold text-white mt-5 first-letter:uppercase">
        {question.title}
      </p>
      <div className=" flex gap-3  mt-5 text-white ">
        <span className=" text-sm flex gap-2 cursor-pointer">
          <AiOutlineLike /> {question?.upvotes} votes
        </span>
        <span className=" text-sm flex gap-2 cursor-pointer">
          <BiSolidMessageAltDetail /> {question.answers.length} answers
        </span>
        <span className=" text-sm flex gap-2 cursor-pointer">
          <AiOutlineEye /> {question.views} views
        </span>
      </div>

      <div className=" mt-10 max-md:max-w-[500px]">
        <ParseHTML data={question.content} />
      </div>

      <div className=" mt-5 flex gap-4">
        {question?.tags.map((tag: any) => (
          <RenderTag
            _id={tag._id}
            name={tag.name}
            key={tag._id}
            className=" px-5"
          />
        ))}
      </div>

      <div className="">
        <Answer answersCount={question?.answers?.length} />
      </div>
    </div>
  );
};

export default QuestionDetail;
