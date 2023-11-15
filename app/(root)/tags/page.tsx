import TagCard from "@/components/home/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Search from "@/components/shared/Search";
import { userFilters } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.actions";
import React from "react";

const Tags = async () => {
  const tags = await getAllTags();
  return (
    <div className=" mt-5 flex w-full flex-col">
      <div className="flex w-full gap-3 max-sm:flex-col">
        <Search placeholder="Search Amazing Minds" />
        <Filter filters={userFilters} />
      </div>
      {tags.length > 0 ? (
        <div className=" w-full flex flex-wrap mt-5 gap-4">
          {tags?.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </div>
      ) : (
        <NoResult
          title="No tag Found"
          ButtonText="Create Tag"
          link="/tag/create"
        />
      )}
    </div>
  );
};

export default Tags;
