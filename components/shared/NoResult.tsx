import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoResult = ({
  title,
  ButtonText,
  link,
}: {
  title: string;
  ButtonText: string;
  link: string;
}) => {
  return (
    <div className=" mt-10 flex flex-col p-5 gap-3 mx-auto justify-center">
      <Image
        src={"/assets/images/dark-illustration.png"}
        width={300}
        height={300}
        alt="dark-illustration"
        className=" "
      />
      <h1 className=" text-xl mx-auto font-bold text-neutral-400">{title}</h1>
      <Link
        href={link}
        className=" w-fit px-3 py-2 mx-auto  bg-gradient-to-r from-orange-500 to-orange-200 rounded-lg"
      >
        {ButtonText}
      </Link>
    </div>
  );
};

export default NoResult;
