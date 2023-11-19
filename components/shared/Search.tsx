"use client";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import GlobalResult from "./GlobalResult";
const Search = ({ placeholder }: { placeholder: string }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const globalResultsRef = useRef();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("global");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["global"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <div className=" flex flex-col max-w-[600px]">
      <div className={` h-12 w-[600px] bg-black/40 flex gap-1 rounded-lg `}>
        <span className=" my-auto px-3 text-white">
          <FiSearch />
        </span>
        <input
          type="text"
          className={`border-none outline-none bg-transparent w-full h-full text-white`}
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
        />
      </div>
      {isOpen && (
        <GlobalResult
          globalResultsRef={globalResultsRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Search;
