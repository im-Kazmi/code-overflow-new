import Image from "next/image";
import React from "react";

const UserCard = ({ user }: any) => {
  return (
    <div
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
      </div>
    </div>
  );
};

export default UserCard;
