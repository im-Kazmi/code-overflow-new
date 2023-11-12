import Link from "next/link";
import React from "react";

interface Props {
  _id: number;
  name: string;
  totalQuestions: number;
  showCount: boolean;
  textColor: string;
}
const RenderTag = ({
  _id,
  name,
  totalQuestions,
  showCount,
  textColor,
}: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      id={_id}
      className=" flex justify-between cursor-pointer"
    >
      <p
        className={` w-fit px-2 py-2 ${textColor} text-white  bg-black/40 rounded-xl `}
      >
        {name}
      </p>
      {showCount && <span className=" text-white">{totalQuestions}</span>}
    </Link>
  );
};

export default RenderTag;
