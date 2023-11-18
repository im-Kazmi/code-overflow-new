"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext?: any;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  //   const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPage = direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    router.push(`${pathname}?page=${nextPage}`, { scroll: false });
  };
  return (
    <div className=" flex w-full justify-center mt-4 gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className=" bg-white text-black rounded-md "
      >
        Prev
      </Button>
      <p className=" font-bold px-3.5 rounded-md py-2 bg-orange-500 text-white ">
        {pageNumber}
      </p>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className=" bg-white text-black rounded-md "
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
