import UserCard from "@/components/home/UserCard";
import Filter from "@/components/shared/Filter";
import Search from "@/components/shared/Search";
import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async () => {
  const users = await getUsers();
  return (
    <div className=" mt-5 flex w-full flex-col">
      <div className="flex w-full gap-3 max-sm:flex-col">
        <Search placeholder="Search Amazing Minds" />
        <Filter />
      </div>
      <div className=" w-full flex flex-wrap  justify-center mt-5">
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Community;
