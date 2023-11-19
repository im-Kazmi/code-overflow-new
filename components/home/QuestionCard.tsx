/* eslint-disable no-unused-vars */
import RenderTag from "../shared/RenderTag";
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, auth } from "@clerk/nextjs";
import { FaTrash } from "react-icons/fa";
import { deleteQuestion } from "@/lib/actions/question.action";
import Modal from "../shared/Modal";
import EditDeleteAction from "../shared/EditDeleteAction";

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
    clerkId: string;
  };
  upvotes: string[] | Array<object>;
  views: number[];
  answers?: Array<object>;
  createdAt: Date;
  isProfile?: boolean;
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
  isProfile = false,
}: QuestionProps) => {
  const { userId } = auth();
  const showActionButtons = userId && userId === author?.clerkId;
  return (
    <div className=" cursor-pointer w-full px-3 py-2 text-white bg-black/40 rounded-lg flex flex-col">
      <div className=" w-full flex-col">
        <div className=" flex justify-between">
          <Link
            href={`/question/${_id}`}
            className=" text-xl font-bold  text-neutral-400"
          >
            {title}
          </Link>
          <SignedIn>
            {showActionButtons && (
              <div className=" ">
                <EditDeleteAction
                  type="Question"
                  itemId={JSON.stringify(_id)}
                />
              </div>
            )}
          </SignedIn>
        </div>
        <div className=" flex gap-3 mt-4">
          {tags.map((tag) => (
            <RenderTag _id={tag._id} key={tag._id} name={tag.name} />
          ))}
        </div>
        <div className=" flex w-full px-3 mt-3 gap-3 justify-between max-sm:flex-col ">
          <div className=" flex gap-2">
            <Image
              src={author.picture}
              width={30}
              height={30}
              alt={author.name}
              className=" rounded-full"
            />
            <h1 className=" my-auto">{author.name}</h1>
            {!isProfile && (
              <span className=" text-xs my-auto text-orange-500 ml-3">
                {moment(createdAt).fromNow()}
              </span>
            )}
          </div>
          <div className=" flex gap-3  max-sm:mt-4 ">
            <span className=" text-sm my-auto flex gap-2 cursor-pointer">
              <AiOutlineLike /> {upvotes?.length} votes
            </span>
            <span className=" text-sm my-auto flex gap-2 cursor-pointer">
              <BiSolidMessageAltDetail /> {answers && answers.length} answers
            </span>
            <span className=" text-sm my-auto flex gap-2 cursor-pointer">
              <AiOutlineEye /> {views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
