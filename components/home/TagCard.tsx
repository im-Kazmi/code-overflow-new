import Link from "next/link";
import React from "react";

// interface Props {
//   tag: {
//     _id: string;
//     name: string;
//     description?: string;
//   };
// }
const TagCard = ({ tag }: any) => {
  return (
    <Link
      href={`tag/${tag?._id}`}
      key={tag?._id}
      className=" w-fit p-5 bg-black/40 flex flex-col gap-2 rounded-lg"
    >
      <div className=" flex flex-col mx-auto">
        <h1 className=" text-xl font-bold mx-auto bg-black/80 px-2 py-1 rounded-lg text-neutral-300">
          {tag.name}
        </h1>
      </div>
      <span className="  font-bold text-orange-400">
        {tag?.questions?.length}+{" "}
        <span className="  ml-2 text:md font-normal text-white">Questions</span>
      </span>
    </Link>
  );
};

export default TagCard;
