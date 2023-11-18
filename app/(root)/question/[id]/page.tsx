import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { userFilters } from "@/constants";
import Filter from "@/components/shared/Filter";
import { getAllAnswers } from "@/lib/actions/answer.action";
import moment from "moment";
import Votes from "@/components/shared/Votes";

const QuestionDetail = async ({ params }: { params: Params }) => {
  const { id } = params;
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const question = await getQuestionById({ id });
  const answers = await getAllAnswers({ questionId: question?._id });

  return (
    <div className="flex flex-col w-full mt-5">
      <div className="flex justify-between w-full">
        <div className=" flex gap-3">
          <Image
            src={question?.author?.picture}
            width={40}
            height={40}
            alt={question?.author?.name}
            className=" rounded-full"
          />
          <h1 className=" text-neutral-300 my-auto font-semibold">
            {question?.author?.name}
          </h1>
        </div>
        <div>
          <Votes
            upvotes={question?.upvotes.length}
            downVotes={question?.downVotes.length}
            hasUpvoted={question?.upvotes.includes(mongoUser?._id)}
            hasDownVoted={question?.downVotes.includes(mongoUser?._id)}
            hasSaved={mongoUser?.saved.includes(question._id)}
            userId={JSON.stringify(mongoUser?._id)}
            itemId={JSON.stringify(question._id)}
            type="Question"
          />
        </div>
      </div>
      {/* Here to put Votes</div> */}
      <p className=" text-2xl font-bold text-white mt-5 first-letter:uppercase">
        {question.title}
      </p>
      <div className=" flex gap-3  mt-5 text-white ">
        <span className=" text-orange-400 text-sm">
          {" "}
          Asked {moment(question.createdAt).fromNow()}
        </span>
        <span className=" text-sm flex gap-2 cursor-pointer">
          <AiOutlineLike /> {question?.upvotes.length} votes
        </span>
        <span className=" text-sm flex gap-2 cursor-pointer">
          <BiSolidMessageAltDetail /> {question.answers.length} answers
        </span>
        <span className=" text-sm flex gap-2 cursor-pointer">
          <AiOutlineEye /> {question.views} views
        </span>
      </div>
      <div className=" mt-10 max-w-[700px] max-lg:max-w-[500px]">
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
      <div className=" flex justify-between ">
        <span className=" text-orange-400 flex my-auto font-bold">
          {question?.answers.length} Answers
        </span>
        <Filter filters={userFilters} />
      </div>
      <div className=" mt-5 flex flex-col">
        <AllAnswers answers={answers} userId={mongoUser?._id} />
      </div>
      <div className="">
        <AnswerForm
          answersCount={question?.answers?.length}
          questionId={JSON.stringify(question?._id)}
          userId={JSON.stringify(mongoUser?._id)}
        />
      </div>
    </div>
  );
};

export default QuestionDetail;
