/* eslint-disable no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}
const UserCard = ({ user }: Props) => {
  // const interactedTags = getUserTopInteractedTags({ userId: user._id });
  const interactedTags = [
    { _id: "1", name: "React" },
    { _id: "2", name: "Next.js" },
  ];
  return (
    <Link
      href={`profile/${user?.clerkId}`}
      key={user?._id}
      className=" w-fit p-5 bg-black/40 flex flex-col gap-2 rounded-lg"
    >
      <Image
        src={user?.picture}
        width={80}
        height={80}
        alt={user.name}
        className=" rounded-full mx-auto"
        loading="lazy"
      />
      <div className=" flex flex-col mx-auto">
        <h1 className=" text-xl font-bold mx-auto text-neutral-300">
          {user.name}
        </h1>
        <span className=" text-sm mx-auto text-neutral-500">
          @{user?.username}
        </span>
        {interactedTags.length > 0 ? (
          <div className=" flex gap-2 mt-2">
            {interactedTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                className=" py-1 px-3"
              />
            ))}
          </div>
        ) : (
          <div className=" text-sm">No Tag</div>
        )}
      </div>
    </Link>
  );
};

export default UserCard;
