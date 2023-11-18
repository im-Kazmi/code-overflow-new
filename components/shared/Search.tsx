import React from "react";
import { FiSearch } from "react-icons/fi";
const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className={` h-12 w-[600px] bg-black/40 flex gap-1 rounded-lg `}>
      <span className=" my-auto px-3 text-white">
        <FiSearch />
      </span>
      <input
        type="text"
        className={`border-none outline-none bg-transparent w-full h-full text-white`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
