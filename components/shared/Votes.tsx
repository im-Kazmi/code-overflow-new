"use client";
import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.action";
import {
  downVoteQuestion,
  saveQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.action";
import React from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { TbStar, TbStarFilled } from "react-icons/tb";

interface Props {
  upvotes: number;
  downVotes: number;
  hasUpvoted: boolean;
  hasDownVoted: boolean;
  itemId: string;
  userId: string;
  type: string;
  hasSaved?: boolean;
}
const Votes = ({
  upvotes,
  downVotes,
  hasUpvoted,
  hasDownVoted,
  itemId,
  userId,
  type,
  hasSaved,
}: Props) => {
  const handleVote = async (action: string) => {
    if (action === "upvote") {
      if (type === "Question") {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownVoted,
        });
      } else if (type === "Answer") {
        await upVoteAnswer({
          answerId: itemId,
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownVoted,
        });
      }
    } else if (action === "downvote") {
      if (type === "Question") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownVoted,
        });
      } else if (type === "Answer") {
        console.log("hasDownVoted", hasDownVoted);
        console.log("hasDownVoted", hasUpvoted);
        await downVoteAnswer({
          answerId: itemId,
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownVoted,
        });
      }
    }
  };
  const handleSave = async () => {
    try {
      await saveQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
      });
    } catch (error) {}
  };
  return (
    <div className=" flex  w-full gap-4">
      <div className="  flex gap-1 ">
        {hasUpvoted ? (
          <div className=" text-orange-400 my-auto">
            <BiUpvote />
          </div>
        ) : (
          <div
            onClick={() => handleVote("upvote")}
            className=" text-white my-auto cursor-pointer"
          >
            <BiUpvote />
          </div>
        )}
        <span className=" w-fit rounded-sm p-[4px] text-xs text-white bg-black/40">
          {upvotes}
        </span>
      </div>

      <div className="  flex gap-1 ">
        {hasDownVoted ? (
          <div className=" text-orange-400 my-auto">
            <BiDownvote />
          </div>
        ) : (
          <div
            onClick={() => handleVote("downvote")}
            className=" text-white cursor-pointer my-auto"
          >
            <BiDownvote />
          </div>
        )}
        <span className=" w-fit rounded-sm p-[4px] text-xs text-white  bg-black/40">
          {downVotes}
        </span>
      </div>

      <div className="  flex gap-1 ">
        {hasSaved ? (
          <div
            onClick={handleSave}
            className=" cursor-pointer text-orange-400 my-auto"
          >
            <TbStarFilled />
          </div>
        ) : (
          <div
            onClick={handleSave}
            className=" cursor-pointer text-white  my-auto"
          >
            <TbStar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Votes;