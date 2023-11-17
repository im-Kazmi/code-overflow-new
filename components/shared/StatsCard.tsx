import Image from "next/image";
import React from "react";

interface Props {
  imageUrl?: string;
  title: string;
  value: number;
}
const StatsCard = ({ imageUrl, title, value }: Props) => {
  return (
    <div className=" w-fit px-4 gap-4 py-2  flex rounded-lg bg-black/30">
      {imageUrl && (
        <Image
          src={imageUrl}
          width={30}
          height={30}
          alt={title}
          className=" "
        />
      )}
      <div className={`flex  ${imageUrl ? "flex-col " : "gap-2"} my-auto`}>
        <span className={` text-orange-400 font-bold `}>{value}</span>
        <h1 className={` text-sm text-white ${imageUrl ? "" : " my-auto"}`}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default StatsCard;
