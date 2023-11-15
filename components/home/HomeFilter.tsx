import { filters } from "@/constants";
import React from "react";

const HomeFilter = () => {
  const isActive = "1";
  return (
    <div className=" flex mt-5 w-full gap-5 max-sm:hidden">
      {filters.map((filter) => (
        <span
          key={filter.id}
          className={`w-fit px-3 py-1 rounded-lg text-neutral-500 cursor-pointer bg-black/40 ${
            filter.id === isActive && "text-orange-500"
          }`}
        >
          {filter.name}
        </span>
      ))}
    </div>
  );
};

export default HomeFilter;
