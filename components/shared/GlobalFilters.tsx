/* eslint-disable no-unused-vars */
"use client";
import { GlobalSearchFilters } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");
  const [active, setIsActive] = useState(typeParams || "");

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setIsActive("");
      const newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["type"],
      });

      router.push(newUrl);
    } else {
      const newUrl = formUrlQuery({
        searchParams: searchParams.toString(),
        key: "type",
        value: item,
      });
      router.push(newUrl);
      setIsActive(item);
    }
  };
  return (
    <div className=" flex gap-3 p-3">
      <span>Type:</span>
      {GlobalSearchFilters.map((item) => {
        return (
          <div
            className={`  cursor-pointer w-fit rounded-2xl px-3 py-0.5 text-white ${
              active === item.value ? " bg-orange-500" : "bg-white/20"
            }`}
            key={item.id}
            onClick={() => handleFilterClick(item.value)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default GlobalFilters;
