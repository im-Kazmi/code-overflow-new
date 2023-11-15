"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/constants";

const Filter = () => {
  return (
    <div className=" max-sm:flex max-sm:w-full">
      <Select>
        <SelectTrigger className="w-[180px]  text-white border-none shadow-lg my-auto bg-black/40 outline-none h-14 focus:border-none">
          <SelectValue placeholder="Select a Filter" className="" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 opacity-100 text-white outline-none border-none">
          <SelectGroup>
            <SelectLabel>Filters</SelectLabel>
            {filters.map((item) => (
              <SelectItem
                key={item.id}
                className=" text-white"
                value={item.value}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
