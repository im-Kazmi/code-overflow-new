/* eslint-disable no-unused-vars */
"use client";
import { handleClickOutside } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbLoader } from "react-icons/tb";
import Link from "next/link";
import { BsTag } from "react-icons/bs";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

interface IResultItem {
  title?: string;
  id?: string;
  type?: string;
}
const GlobalResult = ({ isOpen, setIsOpen, globalResultsRef }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState(Array<IResultItem>);
  const searchParams = useSearchParams();
  const global = searchParams.get("global")?.toString() as string;
  const type = searchParams.get("type")?.toString() as string;

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      setIsLoading(true);

      try {
        const globalResults = await globalSearch({
          type,
          query: global,
        });
        console.log("frontend results = ", globalResults);
        setResults(JSON.parse(globalResults));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchResults();
    }
  }, [type, global]);

  const renderLink = (type: string, id: string) => {
    return type;
  };
  return (
    <div className=" absolute z-10 top-8 w-[600px]  bg-black rounded-lg mt-10 p-3 text-white ">
      <GlobalFilters />
      <hr className=" border-neutral-600 p-3 w-full mt-2" />
      <h1 className=" font-bold px-3 ">Top Match</h1>
      {isLoading && (
        <div className=" w-full flex  justify-center">
          <span className=" text-orange-500 text-2xl animate-spin">
            <TbLoader />
          </span>
        </div>
      )}

      <div className=" mt-2">
        {results.length > 0 ? (
          results.map((item, index) => {
            return (
              <Link
                key={item.id}
                href={renderLink("", "")}
                className=" flex gap-3 py-3 px-3 hover:bg-white/10 rounded-md"
              >
                <span className=" my-auto">
                  <BsTag />
                </span>
                <div className=" flex flex-col">
                  <h1 className=" font-bold text-white ">{item?.title}</h1>
                  <span className=" text-xs ">{item?.type}</span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className=" w-full flex justify-center">
            <span className=" text-xl font-bold text-orange-500">
              Oops nothing found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
