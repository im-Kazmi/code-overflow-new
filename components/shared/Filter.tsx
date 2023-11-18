"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface FilterProps {
  filters: {
    id: string;
    name: string;
    value: string;
  }[];
}

const Filter = ({ filters }: FilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterClick = (item: string) => {
    if (item.toLowerCase() === searchParams.get("filter")?.toString()) return;
    router.push(`${pathname}?filter=${item.toLowerCase()}`, { scroll: false });
  };

  const handleFilterChange = (selectedValue: string) => {
    handleFilterClick(selectedValue);
  };
  return (
    <div className=" max-sm:flex">
      <Select onValueChange={handleFilterChange}>
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
