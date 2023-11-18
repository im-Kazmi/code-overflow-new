"use client";
import { removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  pageNumber: number;
  isNext?: any;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPage = direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    router.push(`${pathname}?page=${nextPage}`, { scroll: false });
  };

  useEffect(() => {
    if (searchParams !== null && Number(searchParams.get("page")) === 1) {
      const newUrl = removeKeysFromQuery({
        searchParams: searchParams.toString(),
        keysToRemove: ["page"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [pageNumber, searchParams, router]);
  return (
    <div className=" flex w-full justify-center mt-4 gap-2">
      <button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className=" bg-black/40 disabled:bg-black/20 text-white px-4 py-2  rounded-md "
      >
        Prev
      </button>
      <p className=" font-bold px-3.5 rounded-md py-2 bg-orange-500 text-white ">
        {pageNumber}
      </p>
      <button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className=" bg-black/40 text-white px-4 py-2  rounded-md disabled:bg-black/20 "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
