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
  const handleVote = (action: string) => {};
  const handleSave = () => {};
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
            className=" text-white my-auto"
          >
            <BiUpvote />
          </div>
        )}
        <span className=" w-fit rounded-sm p-[4px] text-xs text-white bg-black/40">
          0
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
            className=" text-white my-auto"
          >
            <BiDownvote />
          </div>
        )}
        <span className=" w-fit rounded-sm p-[4px] text-xs text-white  bg-black/40">
          2
        </span>
      </div>

      <div className="  flex gap-1 ">
        {hasSaved ? (
          <div className=" text-orange-400 my-auto">
            <TbStarFilled />
          </div>
        ) : (
          <div onClick={handleSave} className=" text-orange-400 my-auto">
            <TbStar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Votes;
