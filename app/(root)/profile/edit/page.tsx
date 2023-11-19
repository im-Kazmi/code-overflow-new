import EditProfile from "@/components/forms/EditProfile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  const user = await getUserById({ userId });
  return (
    <div className=" flex flex-col gap-5">
      <h1 className=" text-xl font-bold text-neutral-300">Edit Profile</h1>
      <EditProfile user={JSON.stringify(user)} clerkId={userId} />
    </div>
  );
};

export default Page;
