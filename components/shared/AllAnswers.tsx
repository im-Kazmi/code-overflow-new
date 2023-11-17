import moment from "moment";
import Image from "next/image";
import React from "react";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

const AllAnswers = async ({ answers, userId }: any) => {
  return (
    <div className=" w-full flex ">
      {answers.length > 0 ? (
        <div className=" flex flex-col">
          {answers?.map((answer: any) => (
            <div key={answer._id} className=" flex flex-col">
              <div className=" flex justify-between ">
                <div className=" flex gap-2">
                  <Image
                    src={answer.author.picture}
                    width={30}
                    height={30}
                    alt={answer.author.name}
                    className=" rounded-full"
                  />
                  <h1 className=" my-auto text-white">{answer.author.name}</h1>
                  <span className=" my-auto text-white ml-2 text-xs">
                    Answered {moment(answer.createdAt).fromNow()}
                  </span>
                </div>
                <div>
                  <Votes
                    upvotes={answer.upvotes?.length}
                    downVotes={answer.downvotes?.length}
                    hasUpvoted={answer.upvotes?.includes(userId)}
                    hasDownVoted={answer.downvotes?.includes(userId)}
                    userId={JSON.stringify(userId)}
                    itemId={JSON.stringify(answer._id)}
                    type="Answer"
                  />
                </div>
              </div>
              <div className=" flex flex-col mt-3 max-w-[700px] max-lg:max-w-[500px]">
                <ParseHTML data={answer.content} />
              </div>
              <div className="my-5  w-full">
                <hr className=" w-full border-neutral-600" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllAnswers;
