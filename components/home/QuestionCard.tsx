import React from "react";
import RenderTag from "../shared/RenderTag";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import moment from "moment";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}
const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className=" cursor-pointer w-full p-5 bg-black/40 rounded-lg flex flex-col">
      <div className=" w-full flex-col">
        <span className="hidden max-sm:flex text-sm">2 days ago</span>
        <h1 className=" text-xl font-bold  text-neutral-400">{title}</h1>
        <div className=" flex gap-3 mt-4">
          {tags.map((tag) => (
            <RenderTag _id={tag._id} key={tag._id} name={tag.name} />
          ))}
        </div>
        <div className=" flex w-full px-3 mt-3 justify-between max-sm:flex-col ">
          <div className=" flex gap-2">
            {/* <Image
              src={author.picture}
              width={30}
              height={30}
              alt={author.name}
              className=" rounded-full"
            /> */}
            <h1 className="">{author.name}</h1>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
          <div className=" flex gap-3  max-sm:mt-4 ">
            <span className=" text-sm flex gap-2 cursor-pointer">
              <AiOutlineLike /> {upvotes} votes
            </span>
            <span className=" text-sm flex gap-2 cursor-pointer">
              <BiSolidMessageAltDetail /> {answers.length} answers
            </span>
            <span className=" text-sm flex gap-2 cursor-pointer">
              <AiOutlineEye /> {views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
