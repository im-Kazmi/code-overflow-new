/* eslint-disable no-unused-vars */
"use client";
import { filters } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomeFilter = () => {
  const [isActive, setIsActive] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsActive(searchParams.get("filter") as string);
  }, [searchParams]);

  const handleFilterClick = (item: string) => {
    if (isActive === item) {
      setIsActive("");
      const newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["filter"],
      });

      router.push(newUrl);
    } else {
      const newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "filter",
        value: item,
      });
      router.push(newUrl);
    }
  };
  return (
    <div className=" flex mt-5 w-full gap-5 max-sm:hidden">
      {filters.map((filter) => (
        <span
          key={filter.id}
          onClick={() => handleFilterClick(filter.value)}
          className={`w-fit px-3 py-1 rounded-lg text-neutral-500 cursor-pointer bg-black/40 ${
            filter.name.toLowerCase() === isActive && "text-orange-500"
          }`}
        >
          {filter.name}
        </span>
      ))}
    </div>
  );
};

export default HomeFilter;
