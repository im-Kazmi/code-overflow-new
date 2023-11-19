import Link from "next/link";
import React from "react";

interface Props {
  _id: string;
  name?: string;
  totalQuestions?: any;
  showCount?: boolean;
  className?: string;
}
const RenderTag = ({
  _id,
  name,
  totalQuestions,
  showCount,
  className,
}: Props) => {
  return (
    <Link href={`/tag/${_id}`} className=" flex justify-between cursor-pointer">
      <p
        className={` w-fit px-2 py-2  text-white  bg-black/40 rounded-xl  ${className}`}
      >
        {name}
      </p>
      {showCount && (
        <span className=" text-white">{totalQuestions.length}</span>
      )}
    </Link>
  );
};

export default RenderTag;
