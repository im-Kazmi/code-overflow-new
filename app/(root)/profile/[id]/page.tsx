import { getUserInfo } from "@/lib/actions/user.action";
import moment from "moment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) => {
  const { id } = params;
  const userInfo = await getUserInfo({ userId: id });
  const { user }: any = userInfo;
  return (
    <div className=" w-full flex flex-col">
      <div className=" flex  flex-col w-fit gap-3 justify-center">
        <Image
          src={user.picture}
          width={180}
          height={180}
          alt={user.name}
          className="rounded-full ring-8 ring-black/40 shadow-xl"
        />
        <div className="flex flex-col m-auto gap-1 w-fit  ">
          <h1 className=" text-xl m-auto  font-bold text-white">{user.name}</h1>
          <span className="text-xs m-auto  text-white">@{user.username}</span>
        </div>
      </div>
      <div className="flex flex-col m-auto">
        <div className=" flex gap-2 text-white">
          <span>Joined</span>
          <span className=" ">{moment(user.joinedAt).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
