import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "./EditDeleteAction";

interface QuestionProps {
  _id: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  question: any;
  upvotes: number;
  createdAt: Date;
  clerkId: string | null;
}
const AnswerCard = ({
  _id,
  author,
  upvotes,
  createdAt,
  question,
  clerkId,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author?.clerkId;

  return (
    <Link
      href={`/question/${question._id}`}
      className=" cursor-pointer w-full p-5 text-white bg-black/40 rounded-lg flex flex-col"
    >
      <div className=" w-full flex-col">
        <h1 className=" text-xl font-bold  text-neutral-400">
          {question.title}
        </h1>
        <div className=" flex w-full px-3 mt-3 gap-3 justify-between max-sm:flex-col ">
          <div className=" flex gap-2">
            <Image
              src={author.picture}
              width={30}
              height={30}
              alt={author.name}
              className=" rounded-full"
            />
            <h1 className="">{author.name}</h1>
          </div>
          <div className=" flex gap-3  max-sm:mt-4 ">
            <span className=" text-sm my-auto flex gap-2 cursor-pointer">
              <AiOutlineLike /> {upvotes} votes
            </span>
          </div>
          <SignedIn>
            {showActionButtons && (
              <div className=" ">
                <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
              </div>
            )}
          </SignedIn>
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
